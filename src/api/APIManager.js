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
                fn(this);
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
