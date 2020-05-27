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

<<<<<<< HEAD
const fs = require('fs'),
    low = require('lowdb'),
    fisy = require('lowdb/adapters/FileSync'),
    Path = require('path');

=======
>>>>>>> 919e4e5b169cb9ffe8a376d28015e0ce9e1b324c
class DatabaseManager {
    /**
     *
     * @param {../managers/Manager} manager
     */
    constructor(manager) {
        this._manager = manager;
        this._db = undefined;
<<<<<<< HEAD
        this._dbtypes = {};
        this._config = undefined;
    }

    setdb(databaseType) {
        if (this._db === undefined) {
            if (typeof databaseType == "string") {
                if (this._dbtypes[databaseType] !== undefined) {
                    this._db = new this._dbtypes[databaseType](this);
                } else {
                    throw new Error("No database of name " + databaseType + " registered.")
                }
            } else {
                this._db = new databaseType(this);
            }
        } else {
            throw new Error("Database type has already been set");
        }
    }

    initConfig() {
        if (!fs.existsSync(Path.join(this._manager.getPath("config"), "database.json"))) {
            this._config = low(new fisy(Path.join(this._manager.getPath("config"), "database.json")));
            this._config.defaults({
                type: "sqlite"
            }).write();
        } else {
            this._config = low(new fisy(Path.join(this._manager.getPath("config"), "database.json")));
        }
        if(this._dbtypes[this._config.get("type").value()] !== undefined) {
            this.setdb(this._config.get("type").value())
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }

    regdb(name, databaseType) {
        this._dbtypes[name] = databaseType;
=======
    }

    setdb(databaseType) {
        this._db = new databaseType(this);
>>>>>>> 919e4e5b169cb9ffe8a376d28015e0ce9e1b324c
    }

    init() {
        this._db.init();
    }

    get db() {
        return this._db;
    }

    get manager() {
        return this._manager;
    }
}

module.exports = DatabaseManager;
