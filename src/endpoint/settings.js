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

const Endpoint = require('../api/Endpoint');
const async = require('async');
const User = require('../util/User');
const settings = require('../util/settings');

let q = {
    settings: require('../db/queries/sqlite/settings'),
    user: require('../db/queries/sqlite/user'),
}

class State extends Endpoint {
    constructor(props) {
        super(props, {
            path: '/settings',
            types: ['post'],
            description: 'Send multiple "requests" as one.',
            errors: ["incoReq", "noPermission", "invalidUser"],
            posts: [{
                "access-code": "string",
                settings: [{
                    at: "settings|config",
                    setting: "setting",
                    value: "object"
                }]
            }],
            returns: [{
                success: "boolean"
            }, {
                error: "error"
            }]
        });
    }

    run(reqinfo, info) {
        if (reqinfo.type === "post") {
            if (info["access-code"] === "setup" && this.manager.getWebManager().getState() === "setup") {
                return this.changeSettings(info, true);
            } else {
                return this.changeSettings(info);
            }
        } else {
            return {
                error: "incoReq"
            }
        }
    }

    changeSettings(info, nocheck) {
        let user = new User(undefined, this.manager).find({access_code: info["access-code"]});
        if(!user && !nocheck) {
            return {
                error: "invalidUser"
            }
        }
        if (info.type === "set") {
            let toret;
            info.settings.forEach(v => {
                if (nocheck || user.getPermissions().hasPermission(settings[v.setting])) {
                    if (v.at === "config") {
                        this.manager.getConfig().set(v.setting, v.value).write();
                    } else if (v.at === "settings") {
                        if (v.setting === "admin") {
                            let d = JSON.parse(v.value);
                            this.manager.getDbManager().getDbs().userDb.run(q.user.addUser()).run(d.uname, d.pass, JSON.stringify({override: "ALL"}), "admin");
                        } else {
                            this.manager.getDbManager().getDbs().systemDb.run(q.settings.set()).run(v.setting, v.value);
                        }
                    }
                    toret = {
                        success: true,
                    }
                } else {
                    toret = {
                        error: "noPermission"
                    }
                }
            });
            return toret;
        } else if (info.type === "get") {
            return (async () => {
                let toreturn = {};
                for (let se in info.settings) {
                    let v = info.settings[se];
                    if (settings[v.setting] === ["none"] || user.getPermissions().hasPermissions(settings[v.setting]) || nocheck) {
                        if (v.at === "settings") {
                            let ret = this.manager.getDbManager().getDbs().systemDb.run(this.manager.getDbManager().q.settings.get()).get(v.setting);
                            if(ret === undefined) {
                                toreturn[v.setting] = null;
                            } else {
                                toreturn[v.setting] = ret.data;
                            }
                        } else if (v.at === "config") {
                            toreturn[v.setting] = this.manager.getConfig().get(v.setting).value();
                        }
                    } else {
                        toreturn[v.setting] = {
                            error: "noPermission"
                        }
                    }
                }
                return toreturn;
            })();
        } else if (info.type === "all") {
            if (user && user.getPermissions().hasPermission("administrator")) {
                return this.manager.getDbManager().getDbs().systemDb.run(this.manager.getDbManager().q.settings.all()).all();
            } else {
                return [{
                    error: "noPermission"
                }]
            }
        }
    }
}

module.exports = State;
