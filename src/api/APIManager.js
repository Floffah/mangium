/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

class APIManager {
    constructor(manager) {
        this._manager = manager;
        this._connectionTypes = [];
        this._events = new Map();
    }

    init() {
        this._connectionTypes.forEach((connection) => {
            connection.start();
        });
    }

    registerConnectionType(connection) {
        if(typeof connection === "function") {
            let Connection = new connection(this);
            this._connectionTypes.push(Connection);
        } else {
            throw new Error("Connection type is not a class");
        }
    }

    registerEvent(event, fn) {
        if(this._events.has(event)) {
            let fnlist = this._events.get(event);
            fnlist.push(fn);
            this._events.set(event, fnlist);
        } else {
            let fnlist = [fn];
            this._events.set(event, fnlist);
        }
    }

    /**
     *
     * @param {String} event
     * @returns boolean
     */
    hasEvent(event) {
        return this._events.has(event);
    }

    triggerEvent(event, data) {
        if(this._events.has(event)) {
            this._events.get(event).forEach((fn) => {
                fn(this, data, event);
            });
            this._events.get("*").forEach((fn) => {
                fn(this, data, event);
            });
        } else {
            this._manager.getLogger().error(`No event ${event}`);
        }
    }

    get manager() {
        return this._manager;
    }
}

module.exports = APIManager;
