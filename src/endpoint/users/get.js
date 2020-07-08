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

class UserList extends Endpoint {
    constructor(p) {
        super(p, {
            path: "/users/get",
            types: ["post"],
            description: 'Get a user.',
            errors: ["incoReq", "noPermission", "notFound"],
            posts: [{
                access_code: "string",
                userid: "number"
            }, {
                access_code: "string",
                username: "string"
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
                    getuser = new User(undefined, this.manager).find({userid: data.userid});
                } else if(data.username) {
                    getuser = new User(undefined, this.manager).find({username: data.username});
                }
                if(getuser.isNull()) {
                    return {
                        error: "notFound"
                    }
                } else {
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

module.exports = UserList;
