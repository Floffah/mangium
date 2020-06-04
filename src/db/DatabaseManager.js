/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const fs = require('fs'),
    low = require('lowdb'),
    fisy = require('lowdb/adapters/FileSync'),
    Path = require('path');

class DatabaseManager {
    /**
     *
     * @param {../managers/Manager} manager
     */
    constructor(manager) {
        this._manager = manager;
        this._db = undefined;
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
