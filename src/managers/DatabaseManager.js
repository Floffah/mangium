/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const Database = require('../db/Database'),
    knex = require('knex'),
    arrays = require('../util/Arrays'),
    {saveErr} = require('../handler/errorHandlers'),
    Path = require('path');

let q = {
    settings: require('../db/queries/settings')
}

class DatabaseManager {
    constructor(manager) {
        this._manager = manager;
        this._dbs = {};
    }

    init() {
        // db create
        this._dbs.systemDb = new Database({
            path: Path.resolve(this._manager.getPath("db"), 'system.sqlite'),
            type: 'sqlite'
        });

        // cant stop wont stop initializing
        try {
            if (!arrays(this._dbs.systemDb.run(q.settings.listTables()).all()).hasExact({name: 'settings'})) {
                this._dbs.systemDb.run(q.settings.createTable()).run();
            }
            this._manager.getLogger().info("Database initialised");
            this.dodb = true;
        } catch(e) {
            this._manager.getLogger().warn("Something went wrong while initialising the database. Saving...");
            saveErr(this, new Error("Database could not be initialised."), "Database load error")
        }
    }

    /**
     *
     * @returns {{}}
     */
    getDbs() {
        return this._dbs;
    }
}

module.exports = DatabaseManager;
