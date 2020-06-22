/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

module.exports = {
    accessToken() {
        return `INSERT INTO access (token, userid, expires) VALUES (?,?,?);`
    },
    getToken() {
        return `SELECT token,userid FROM access WHERE token = ?;`
    },
    findAccess() {
        return `SELECT token,expires FROM access WHERE userid = ?`;
    },
    deleteAccess() {
        return `DELETE FROM access`;
    },

    addUser() {
        return `INSERT INTO users (username,password,permissions,type) VALUES (?,?,?,?);`
    },
    getUser() {
        return `SELECT * FROM users WHERE username = ? AND password = ?;`
    },
    getUserID() {
        return `SELECT * FROM users WHERE userid = ?;`
    },

    createAccess() {
        return "CREATE TABLE 'access' ('token' varchar(256),'userid' integer, FOREIGN KEY(userid) REFERENCES users(userid), 'expires' datetime);"
    },
    createTable() {
        return "CREATE TABLE 'users' ('userid' integer PRIMARY KEY AUTOINCREMENT, 'username' varchar(255) NOT NULL, 'password' varchar(255) NOT NULL, 'permissions' json, 'type' test);"
    },
}
