import express from "express";

export default class Route {
    public path: string = "";
    private _get?: express.RequestHandler;
    private _post?: express.RequestHandler;
    private _put?: express.RequestHandler;
    private _delete?: express.RequestHandler;
    private _patch?: express.RequestHandler;
    private _head?: express.RequestHandler;
    private _options?: express.RequestHandler;
    private _all?: express.RequestHandler;

    constructor(path: string) {
        this.path = path;
    }

    public get(handler?: express.RequestHandler) {
        this._get = handler;
        return this;
    }

    public post(handler?: express.RequestHandler) {
        this._post = handler;
        return this;
    }

    public put(handler?: express.RequestHandler) {
        this._put = handler;
        return this;
    }

    public delete(handler?: express.RequestHandler) {
        this._delete = handler;
        return this;
    }

    public patch(handler?: express.RequestHandler) {
        this._patch = handler;
        return this;
    }

    public head(handler?: express.RequestHandler) {
        this._head = handler;
        return this;
    }

    public options(handler?: express.RequestHandler) {
        this._options = handler;
        return this;
    }

    public all(handler?: express.RequestHandler) {
        this._all = handler;
        return this;
    }
}