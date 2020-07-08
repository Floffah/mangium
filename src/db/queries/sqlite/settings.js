/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

module.exports = {
    createTable() {
        return "CREATE TABLE 'settings' (\n" +
            "'name' varchar(255) PRIMARY KEY,\n" +
            "'data' json" +
            ")"
    },
    setupAdmin() {
        return "insert into settings (name, data) values (?, ?);"
    },
    set() {
        return `insert or replace into settings (name, data) values (?, ?);`
    },
    get() {
        return `SELECT data FROM settings WHERE name = ?;`
    }
}
