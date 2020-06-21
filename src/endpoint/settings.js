/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const Endpoint = require('../api/Endpoint');
const async = require('async');

let q = {
    settings: require('../db/queries/settings'),
    user: require('../db/queries/user'),
}

class State extends Endpoint {
    constructor(props) {
        super(props, {
            path: '/settings',
            types: ['post'],
            description: 'Send multiple "requests" as one.',
            errors: ["incoReq"],
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
                return this.changeSettings(info);
            }
        } else {
            return {
                error: "incoReq"
            }
        }
    }

    changeSettings(info) {
        return (async () => {
            await async.forEach(info.settings, (v, d) => {
                if(v.at === "config") {
                    this.manager.getConfig().set(v.setting, v.value).write();
                } else if(v.at === "settings") {
                    if(v.setting === "admin") {
                        this.manager.getDbManager().getDbs().systemDb.run(q.settings.setupAdmin()).run("admin", v.value);
                        let d = JSON.parse(v.value);
                        this.manager.getDbManager().getDbs().userDb.run(q.user.addUser()).run(d.uname, d.pass, JSON.stringify({override: "ALL"}), "admin");
                    }
                }
            });
            return {
                success: true
            }
        })();
    }
}

module.exports = State;
