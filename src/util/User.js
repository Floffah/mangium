/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const Permissions = require('./Permissions');

let q = {
    user: require('../db/queries/user'),
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
     * @param {FindDetails|FindId|FindAccess} data
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
            if(foundAccess.userid) {
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

    getPermissions() {
        return this.data.permissions;
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
 * @typedef FindId
 * @property {String} userid
 */

/**
 * @typedef FindAccess
 * @property {String} access_code
 */
