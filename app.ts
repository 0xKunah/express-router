import fs from "fs";

import Router from "./classes/Router";
import App from "./classes/App";
import Route from "./classes/Route";

export const app = new App(5123, "/api");

fs.readdir("./routes", (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach(_router => {
            // check if file is a directory
            if (fs.lstatSync(`./routes/${_router}`).isDirectory()) {
                let router = new Router(`/${_router}`);
                fs.readdir(`./routes/${_router}`, (err, files) => {
                    if (err) {
                        console.log(err);
                    } else {
                        files.forEach(_route => {
                            let route = require(`./routes/${_router}/${_route}`).default;
                            router.addRoute(route);
                        });
                    }
                });
                app.addRouter(router);
            }
        })
        app.run();
    }
});

// A route without a router
app.addRoute(new Route("/super_example").get((req, res) => {
    return res.json({ message: "Hello World" })
}));