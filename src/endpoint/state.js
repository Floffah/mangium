/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const Endpoint = require('../api/Endpoint');

class State extends Endpoint {
    constructor(props) {
        super(props, {
            path: '/getState',
            types: ['post']
        });
    }

    run(reqinfo, info) {
        if(reqinfo.type === "post") {
            let state = this.manager.getWebManager().getState();
            if(state === info.currentState) {
                return {
                    state: 'error'
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
