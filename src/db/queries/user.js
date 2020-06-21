/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

module.exports = {
    accessToken() {
        return `INSERT INTO access (token, userid) VALUES (?,?);`
    },
    getToken() {
        return `SELECT token FROM access WHERE token = ?;`
    },
    addUser() {
        return `INSERT INTO users (username,password,permissions,type) VALUES (?,?,?,?);`
    },
    createAccess() {
        return "CREATE TABLE 'access' ('token' varchar(30),'userid' integer, FOREIGN KEY(userid) REFERENCES users(userid));"
    },
    createTable() {
        return "CREATE TABLE 'users' ('userid' integer PRIMARY KEY AUTOINCREMENT, 'username' varchar(255) NOT NULL, 'password' varchar(255) NOT NULL, 'permissions' json, 'type' test);"
    },
}