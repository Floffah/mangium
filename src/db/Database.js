/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const Path = require('path'),
    Runner = require('runner');

class Database {
    constructor(dbType, opts) {
        this.dbType = new dbType(opts);
    }

    run(query) {
        let qry;
        if(typeof query === "string") {
            qry = query;
        } else {
            qry = query.toString();
        }
        return new Runner(qry, this);
    }

    executeQuery(query, ...args) {
        return this.dbType.run(query, ...args);
    }
}

module.exports = Database;
