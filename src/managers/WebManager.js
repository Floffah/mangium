/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const express = require("express"),
    Path = require("path");

const APIManager = require('./APIManager');

class WebManager {
    constructor(manager) {
        this._manager = manager
        this._created = false
        this._app = undefined
        this._http = undefined
        this._handlers = undefined
        this._apimanager = undefined;
        this._state = "starting";
    }

    create() {
        if (this._created === true && this._app === undefined && this._http === undefined) {
            this._manager.getLogger().err("This WebManager has already been created")
            return
        }

        this._handlers = {}

        this._app = express()
        this._server = require("http").createServer(this._app)

        this._app.use("/media", express.static(Path.resolve(__dirname, "../../media/dist")))

        this._app.get("/", (req, res) => {
            res.sendFile(Path.resolve(this._manager.getPath("web"), "index.html"), {
                header: "Content-Type: text/html; charset=UTF-8"
            });
        });


        if (this._manager.getConfig().get("enable.api").value() === true) {
            this._apimanager = new APIManager(this);
            this._apimanager.create();
        } else {
            this._app.use("/api", (req, res) => {
                res.status(200).json({
                    error: "apiDisabled"
                });
            });
        }

        this._created = true
    }

    listen() {
        Object.keys(this._handlers).forEach((k) => {
            this._handlers[k] = new this._handlers[k](this._manager);
            if (typeof this._handlers[k].onListen === "function") {
                this._handlers[k].onListen(this);
            }
        });
        this._server.listen(this._manager.getConfig().get("web.port").value(), this._manager.getConfig().get("web.hostname").value(), () => {
            this._manager
                .getLogger()
                .info("Web panel listening on address " + this._server.address().address + ":" + this._server.address().port)
        });
    }

    needSetup() {
        this.setState("setup");
        Object.keys(this._handlers).forEach((k) => {
            if (typeof this._handlers[k].needSetup === "function") {
                this._handlers[k].needSetup(this._manager);
            }
        });
    }

    started() {
        if (this.getState() !== "setup") {
            this.setState("running");
        }
    }

    /**
     *
     * @param {String} name
     * @param {Handler} handler
     * @returns {Handler}
     */
    handle(name, handler) {
        this._handlers[name] = handler
        return handler
    }

    get server() {
        return this._server;
    }

    get app() {
        return this._app;
    }

    get api() {
        if (this._manager.getConfig().get("enable.api").value() === true) {
            return this._apimanager;
        } else {
            return null;
        }
    }

    get manager() {
        return this._manager;
    }

    getState() {
        return this._state
    }

    setState(state) {
        this._state = state;
    }

    stop() {
        this._server.close();
        this._manager.getLogger().info("Stopping HTTP server.");
    }
}

module.exports = WebManager
