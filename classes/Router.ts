import express from "express";
import Route from "./Route";
import { app } from "../app";

export default class Router {
    public baseUrl: string = "";
    public router: express.Router;
    constructor(baseUrl: string = "") {
        this.baseUrl = baseUrl;
        this.router = express.Router();
    }

    public addRoute(route: Route) {
        let r = this.router.route(route.path)
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
}