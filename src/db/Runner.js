/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

class Runner {
    constructor(query, database) {
        this.query = query;
        this.db = database;
    }

    commit() {
        return this.db.executeQuery(this.query, ...arguments);
    }
}

module.exports = Runner;
