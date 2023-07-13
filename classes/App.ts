import express from "express";
import Router from "./Router";
import cors from "cors";
import http from "http";
import { join } from "path";
import Route from "./Route";
import compression from "compression";
import io from "socket.io";


export default class App {
    private app: express.Application;
    // Use if you want to use websocket
    /* private server: http.Server;
    private io: io.Server;
    */
    private port: number;
    private baseUrl: string = "";

    constructor(port: number, baseUrl: string = "") {
        this.port = port;
        this.baseUrl = baseUrl;
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json({limit: '50mb'}));
        this.app.use(express.urlencoded({limit: '50mb'}));
        this.app.use(compression({ filter: (req, res) => {
            if (req.headers['x-no-compression']) {
                return false
            } else {
                return compression.filter(req, res)
            }
        }, level: 9}));

        this.app.use('/static', express.static('./static'));
        // Use if you want to use websocket
        /* this.server = http.createServer(this.app);
            this.io = new io.Server(this.server, {
                cors: {
                    origin: "*",
                    methods: ["GET", "POST"]
                }
            });
        */

        // Use if you have a client folder
        /* this.app.use('/', express.static('../client'));
        setTimeout(() => {
            this.app.get("/*", (req, res) => {
                res.sendFile(join(__dirname, "../../client/index.html"));
            });
        }, 1000);
        */
    }

    public addRouter(router: Router) {
        this.app.use(`${this.baseUrl}${router.baseUrl}`, router.router);
    }

    public addRoute (route: Route) {
        let r = this.app.route(`${this.baseUrl}${route.path}`)
        // For each method, if it is defined, add it to the router
        for (const [key, value] of Object.entries(route)) {
            if (key.startsWith("_")) {
                let method = key.slice(1);
                if (value)
                {
                    // @ts-ignore
                    r[method](value);
                }
            }
        }
    }
    // Use if you want to use websocket
    /*
    public emit(event: string) {
        this.io.emit("message", { event });
    }
    */

    public run() {
        // If you use websocket: 
        /*
        this.server.listen(this.port, () => {
            console.log(`App listening at http://localhost:${this.port}`);
        });
        this.io.on("connection", (socket) => {
            socket.on("message", (message) => {
                console.log("Msg: " + message);
            })
        });
        */
        // If you don't use websocket:
        this.app.listen(this.port, () => {
            console.log(`App listening at http://localhost:${this.port}`);
        });
    }
}