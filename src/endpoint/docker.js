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

class Docker extends Endpoint {
    constructor(props) {
        super(props, {
            path: '/docker/containers',
            types: ['post'],
            description: 'Get a list of docker containers.',
            errors: ["incoReq", "noPermission"],
            posts: [
                {
                    access_code: "string"
                }
            ],
            returns: ["dockerContainerList", {
                error: "error"
            }]
        });
    }

    run(reqinfo, info, res) {
        if(reqinfo.type === "post") {
            let user = new User(undefined, this.manager).find({access_code: info["access_code"]});
            if(user.getPermissions().hasPermissions(["listContainers"])) {
                this.manager.getDockerManager().docker.listContainers({
                    all: true
                }, (e, containers) => {
                    if(containers) {
                        res.status(200).json({
                            containers
                        });
                    }
                });
                return {nosend: true}
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

module.exports = Docker;
