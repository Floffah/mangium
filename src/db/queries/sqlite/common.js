/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

module.exports = {
    listTables() {
        return "Select name from sqlite_master\n" +
            "where type = 'table';"
    },
}
