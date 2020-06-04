/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const Path = require('path'),
    QueryFile = require('./QueryFile');

class SqliteDatabase {
    constructor(dbManager) {
        this._dbManager = dbManager;
        this._dbManager.manager.setPath("db", Path.resolve(this._dbManager.manager.getPath("data"), 'db'));
        this._queries = new QueryFile(Path.resolve(__dirname, 'sqlite.queries'));
    }

    init() {

    }
}

module.exports = SqliteDatabase;
