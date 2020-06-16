/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const Endpoint = require('../api/Endpoint');
const async = require('async');

class State extends Endpoint {
    constructor(props) {
        super(props, {
            path: '/multi',
            types: ['post'],
            description: 'Send multiple "requests" as one.',
            errors: ["incoReq"],
            posts: [{
                "access-code": "string",
                settings: {
                    "string": "value"
                }
            }],
            returns: [{
                success: "boolean"
            }, {
                error: "error"
            }]
        });
    }

    run(reqinfo, info) {
        if(reqinfo.type === "post") {

        } else {
            return {
                error: "incoReq"
            }
        }
    }
}

module.exports = State;
