/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const Permissions = require('./Permissions');

let q = {
    user: require('../db/queries/sqlite/user'),
}

class User {
    constructor(data, manager) {
        this.data = {};
        this._manager = manager;
    }

    /**
     * Create a user
     * @param {CreateData} data
     */
    create(data) {
        this.data = data;
        if(data.username && data.password) {
            let permissions = data.permissions ? data.permissions.toObject() : new Permissions.presets.normal();
            let type = data.type ? data.type : "normal";
            this._manager.getDbManager().getDbs().userDb.run(q.user.addUser()).run(data.username, data.password, permissions, type)
        } else {
            this.data = null;
            return null;
        }
    }

    /**
     *
     * @param {FindDetails|FindId|FindAccess|FindUsername} data
     * @returns {User|null}
     */
    find(data) {
        if(data.password && data.username) {
            let found = this._manager.getDbManager().getDbs().userDb.run(q.user.getUser()).get(data.username, data.password);
            if(found) {
                this.data = {
                    ...found,
                    permissions: new Permissions(JSON.parse(found.permissions)),
                };
                return this;
            } else {
                this.data = null;
                return null;
            }
        } else if(data.username && !data.password) {
            let found = this._manager.getDbManager().getDbs().userDb.run(q.user.getUsername()).get(data.username);
            if(found) {
                this.data = {
                    ...found,
                    permissions: new Permissions(JSON.parse(found.permissions)),
                };
                return this;
            } else {
                this.data = null;
                return null;
            }
        } else if(data.userid) {
            let found = this._manager.getDbManager().getDbs().userDb.run(q.user.getUserID()).get(data.userid);
            if(found) {
                this.data = {
                    ...found,
                    permissions: new Permissions(JSON.parse(found.permissions)),
                };
                return this;
            } else {
                this.data = null;
                return null;
            }
        } else if(data.access_code) {
            let foundAccess = this._manager.getDbManager().getDbs().userDb.run(q.user.getToken()).get(data.access_code);
            if(foundAccess && foundAccess.userid) {
                let found = this._manager.getDbManager().getDbs().userDb.run(q.user.getUserID()).get(foundAccess.userid);
                if(found) {
                    this.data = {
                        ...found,
                        permissions: new Permissions(JSON.parse(found.permissions)),
                    };
                    return this;
                } else {
                    this.data = null;
                    return null;
                }
            } else {
                this.data = null;
                return null;
            }
        } else {
            this.data = null;
            return null;
        }
    }

    isNull() {
        return this.data === null;
    }

    getPermissions() {
        return this.data.permissions;
    }

    get username() {
        return this.data.username;
    }

    get id() {
        return this.data.userid;
    }

    get type() {
        return this.data.type;
    }

    set username(value) {
        this._manager.getDbManager().getDbs().userDb.run(
            this._manager.getDbManager().q.user.setUsername()
        ).run(value, this.data.userid);
        this.data.username = value;
        return this.data.username;
    }

    set type(value) {
        if(["admin", "user"].includes(value)) {
            this._manager.getDbManager().getDbs().userDb.run(
                this._manager.getDbManager().q.user.setType()
            ).run(value, this.data.type);
            this.data.type = value;
            return this.data.type;
        } else {
            throw new Error("Value must be 'admin' or 'user'. Is case sensitive.")
        }
    }
}

module.exports = User;

/**
 * @typedef CreateData
 * @param {String} username
 * @param {String} password
 * @param {Permissions} permissions
 * @param {"admin"|"normal"|"elevated"|"guest"} type
 */

/**
 * @typedef FindDetails
 * @property {String} password
 * @property {String} username
 */

/**
 * @typedef FindUsername
 * @property {String} username
 */

/**
 * @typedef FindId
 * @property {String} userid
 */

/**
 * @typedef FindAccess
 * @property {String} access_code
 */
