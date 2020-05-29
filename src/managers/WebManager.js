/*
 *     Copyright (C) 2020   Floffah
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const express = require("express"),
    Path = require("path"),
    low = require("lowdb"),
    fisy = require("lowdb/adapters/FileSync"),
    fs = require("fs"),
    SocketHandler = require("../handler/IOHandler"),
    Handler = require('../handler/Handler');

class WebManager {
    constructor(manager) {
        this._manager = manager
        this._created = false
        this._app = undefined
        this._http = undefined
        this._webconf = undefined
        this._handlers = undefined
        this._state = "starting"

        this.io = undefined
    }

    create() {
        if (this._created === true && this._app === undefined && this._http === undefined) {
            this._manager.getLogger().err("This WebManager has already been created")
            return
        }

        if (!fs.existsSync(Path.join(this._manager.getPath("config"), "web.json"))) {
            this._webconf = low(new fisy(Path.join(this._manager.getPath("config"), "web.json")))
            this._webconf.defaults({
                hostname: "127.0.0.1",
                port: 3000
            }).write()
        } else {
            this._webconf = low(new fisy(Path.join(this._manager.getPath("config"), "web.json")))
        }

        this._handlers = {}

        this._app = express()
        this._server = require("http").createServer(this._app)

        this._app.use("/media", express.static(Path.resolve(__dirname, "../../media/dist")))

        this._app.get("/", (req, res) => {
            res.sendFile(Path.resolve(this._manager.getPath("web"), "index.html"), {
                header: "Content-Type: text/html; charset=UTF-8"
            });
        })

        this._created = true
    }

    listen() {
        Object.keys(this._handlers).forEach((k) => {
            this._handlers[k] = new this._handlers[k](this._manager);
            if (typeof this._handlers[k].onListen === "function") {
                this._handlers[k].onListen(this);
            }
        });
        this._server.listen(this._webconf.get("port").value(), this._webconf.get("hostname").value(), () => {
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
