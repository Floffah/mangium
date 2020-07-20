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

class State extends Endpoint {
    constructor(props) {
        super(props, {
            path: '/setupDone',
            types: ['get'],
            description: 'Tell Mangium that the setup is done.',
            errors: ["alreadySet"],
            returns: [{
                success: "boolean"
            }, {
                error: "error"
            }]
        });
    }

    run(reqinfo, info) {
        if(reqinfo.type === "get") {
            let state = this.manager.getWebManager().getState();
            if(state === "setup") {
                this.manager.getWebManager().setState("running");
                this.manager.getConfig().set("settings.setup", true).write();
                return {
                    success: true
                }
            } else {
                return {
                    error: "alreadySet"
                }
            }
        } else {
            throw new Error('Bruh what this shouldn\'t have happened stop');
        }
    }
}

module.exports = State;
