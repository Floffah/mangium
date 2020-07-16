/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const Endpoint = require('../../api/Endpoint');
const User = require("../../util/User");

let q = {
    user: require('../../db/queries/sqlite/user')
}

class UserEdit extends Endpoint {
    constructor(p) {
        super(p, {
            path: "/users/edit",
            types: ["post"],
            description: 'Edit a user.',
            errors: ["incoReq", "noPermission", "notFound"],
            posts: [{
                access_code: "string",
                quserid: "number",
                username: "false|string",
                permissions: "false|object",
                type: "false|string"
            }, {
                access_code: "string",
                qusername: "string",
                username: "false|string",
                permissions: "false|object",
                type: "false|string"
            }],
            returns: [{
                user: "user"
            }, {
                error: "error"
            }]
        });
    }

    run(reqinfo, data, res) {
        if (reqinfo.type === "post") {
            let user = new User(undefined, this.manager).find({access_code: data["access_code"]});
            if (user.getPermissions().hasPermissions(["manageUsers"])) {
                let getuser;
                if(data.userid) {
                    getuser = new User(undefined, this.manager).find({userid: data.quserid});
                } else if(data.username) {
                    getuser = new User(undefined, this.manager).find({username: data.qusername});
                }
                if(getuser.isNull()) {
                    return {
                        error: "notFound"
                    }
                } else {

                    if(data.username !== false) {
                        getuser.username = data.username;
                    }
                    if(data.type !== false) {
                        getuser.type = data.type;
                    }

                    return {
                        user: {
                            username: getuser.username,
                            id: getuser.id,
                            permissions: getuser.getPermissions().toObject(),
                            type: getuser.type
                        }
                    }
                }
            } else {
                return {
                    error: "noPermission"
                }
            }
        } else {
            return {
                error: "incoReq"
            }
        }
    }
}

module.exports = UserEdit;
