/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const Endpoint = require('../api/Endpoint');
const User = require("../util/User");

class Permissions extends Endpoint {
    constructor(props) {
        super(props, {
            path: '/user/permissions',
            types: ['post'],
            description: 'Get a user\'s permissions.',
            errors: ['noPermission', 'incoInfo', 'incoReq', 'notFound'],
            posts: [
                {
                    access_code: "string",
                    user_id: "number|'self'"
                }
            ],
            returns: [{
                permissions: "object"
            }, {
                error: "error"
            }]
        });
    }

    run(reqinfo, info) {
        if (reqinfo.type === "post") {
            let user = new User(undefined, this.manager).find({access_code: info["access_code"]});
            if(user.getPermissions().hasPermission("managePermissions") || info.user_id === "self") {
                if(info.user_id === "self") {
                    if(user.isNull()) {
                        return {
                            error: "notFound"
                        }
                    } else {
                        return {
                            permissions: user.getPermissions().toObject()
                        }
                    }
                } else {
                    let targetuser = new User(undefined, this.manager).find({userid: info.user_id});
                    if(targetuser.isNull()) {
                        return {
                            error: "notFound"
                        }
                    } else {
                        return {
                            permissions: targetuser.getPermissions().toObject()
                        }
                    }
                }
            }
        } else {
            return {
                error: 'incoReq',
            }
        }
    }
}

module.exports = Permissions;
