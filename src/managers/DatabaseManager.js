/*
 *     Copyright (C) 2020   Floffah
 *     All rights reserved
 *
 *     See GNU GPL v3 license
 *
 *     See file copyright for individual contributors information
 *
 *     @author Floffah
 *     @link https://github.com/floffah/
 */

const Database = require('../db/Database'),
    arrays = require('../util/Arrays'),
    {saveErr} = require('../handler/errorHandlers'),
    Path = require('path');

let q = {
    settings: require('../db/queries/sqlite/settings'),
    user: require('../db/queries/sqlite/user'),
    common: require('../db/queries/sqlite/common'),
}

class DatabaseManager {
    constructor(manager, type) {
        this._manager = manager;
        this._dbs = {};
        this.type = type;
        if(type === "sqlite") {
            this.q = {
                common: require('../db/queries/sqlite/common'),
                settings: require('../db/queries/sqlite/settings'),
                user: require('../db/queries/sqlite/user'),
                actions: require('../db/queries/sqlite/actions'),
            }
        }
    }

    init() {
        if(this.type === "sqlite") {
            this.initSqlite();
        }
    }

    initSqlite() {
        // db create
        this._dbs.systemDb = new Database({
            path: Path.resolve(this._manager.getPath("db"), 'system.sqlite'),
            type: 'sqlite'
        });
        this._dbs.userDb = new Database({
            path: Path.resolve(this._manager.getPath("db"), 'users.sqlite'),
            type: 'sqlite'
        });

        // cant stop wont stop initializing
        try {
            if (!arrays(this._dbs.systemDb.run(q.common.listTables()).all()).hasExact({name: 'settings'})) {
                this._dbs.systemDb.run(this.q.settings.createTable()).run();
            }
            if (!arrays(this._dbs.userDb.run(q.common.listTables()).all()).hasExact({name: 'users'})) {
                this._dbs.userDb.run(this.q.user.createTable()).run();
            }
            if (!arrays(this._dbs.userDb.run(q.common.listTables()).all()).hasExact({name: 'access'})) {
                this._dbs.userDb.run(this.q.user.createAccess()).run();
            }
            if (!arrays(this._dbs.systemDb.run(q.common.listTables()).all()).hasExact({name: 'actions'})) {
                this._dbs.systemDb.run(this.q.actions.createTable()).run();
            }

            this._manager.getLogger().info("Database initialised");
            this.dodb = true;
        } catch(e) {
            this._manager.getLogger().warn("Something went wrong while initialising the database. Saving...");
            console.error(e)
            saveErr(this._manager, new Error("Database could not be initialised."), "Database load error")
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
