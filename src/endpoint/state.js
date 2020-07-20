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
            path: '/getState',
            types: ['post'],
            description: 'Get the current state',
            errors: ["sameState"],
            posts: [{
                currentState: "state"
            }],
            returns: [{
                state: "state"
            }, {
                error: "error"
            }]
        });
    }

    run(reqinfo, info) {
        if(reqinfo.type === "post") {
            let state = this.manager.getWebManager().getState();
            if(state === info.currentState) {
                return {
                    error: 'sameState'
                }
            } else {
                return {
                    state
                }
            }
        } else {
            throw new Error('Bruh what this shouldn\'t have happened stop');
        }
    }
}

module.exports = State;
