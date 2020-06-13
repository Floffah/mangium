/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const bs3 = require('better-sqlite3');

class SqliteType {
    constructor(opts) {
        this.path = opts.path;
        this.db = bs3(this.path, {});
    }

    run(qry, ...args) {
        return this.db.prepare(qry).run(...args);
    }
}

module.exports = SqliteType;
