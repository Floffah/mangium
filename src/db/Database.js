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

const Path = require('path'),
    bs3 = require('better-sqlite3');

class Database {
    constructor(opts, ko) {
        this.opts = opts;
        if (opts.type === 'sqlite') {
            this.db = bs3(opts.path);
        }
    }

    run(query) {
        let qry;
        if (typeof query === "string") {
            qry = query;
        } else {
            qry = query.toString();
        }
        if (this.opts.type === 'sqlite') {
            return this.db.prepare(query);
        }
    }
}

module.exports = Database;
