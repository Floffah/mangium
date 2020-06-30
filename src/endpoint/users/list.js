/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const Endpoint = require('../../api/Endpoint');
const User = require("../../util/User");

let q = {
    user: require('../../db/queries/user')
}

class UserList extends Endpoint {
    constructor(p) {
        super(p, {
            path: "/users/list",
            types: ["post"],
            description: 'List users.',
            errors: ["incoInfo", "incoReq"],
            posts: [{
                access_code: "string",
                amount: "number",
                index: "number"
            }],
            returns: [{
                "users": [
                    {
                        username: "string",
                        userid: "number"
                    }
                ]
            }, {
                error: "error"
            }]
        });
    }

    run(reqinfo, data, res) {
        if (reqinfo.type === "post") {
            let user = new User(undefined, this.manager).find({access_code: data["access_code"]});
            if (user.getPermissions().hasPermissions(["listUsers"])) {
                let min = 0;
                if (data.index) {
                    min = parseInt(data.index);
                }
                let max = data.amount + min;
                let allusers = this.manager.getDbManager().getDbs().userDb.run(q.user.listUsers()).all();
                let returnusers = [];
                for (let i = min; i <= max; i++) {
                    let usr = allusers[i];
                    if(usr !== undefined) {
                        returnusers.push({
                            id: usr.userid,
                            username: usr.username,
                            type: usr.type
                        });
                    }
                }
                return {
                    users: returnusers
                };
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
