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
    createTable() {
        return "CREATE TABLE 'actions' ('id' integer PRIMARY KEY AUTOINCREMENT, 'type' varchar(255), 'data' json, 'message' varchar(255), 'created' datetime)"
    },

    logAction() {
        return "INSERT INTO actions (type, data, message, created) VALUES (?,?,?,?)"
    },
}
