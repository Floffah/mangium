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
            if((user !== null && user.getPermissions().hasPermission("managePermissions")) || info.user_id === "self") {
                if(info.user_id === "self") {
                    if(user && user.isNull()) {
                        return {
                            error: "notFound"
                        }
                    } else {
                        if(user) {
                            return {
                                permissions: user.getPermissions().toObject()
                            }
                        } else {
                            return {
                                permissions: {}
                            }
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
            } else {
                return {
                    error: "notFound"
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
