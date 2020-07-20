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

module.exports = {
    listTables() {
        return "Select name from sqlite_master\n" +
            "where type = 'table';"
    },
}
