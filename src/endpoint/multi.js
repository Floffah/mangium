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
            errors: ["incoInfo", "incoReq"]
        });
    }

    run(reqinfo, info) {
        if(reqinfo.type === "post") {
            return (async () => {
                let requests = info.requests;
                await async.forEach(requests, (v, d) => {
                    let ep = this.manager.getWebManager().api.endpoints.get(v.path);
                    if(ep === undefined || ep === null) {
                        requests[requests.indexOf(v)] = {
                            error: "incoReq"
                        }
                    } else {
                        requests[requests.indexOf(v)] = ep.run();
                    }
                });
                return requests;
            })();
        } else {
            return {
                error: "incoReq"
            }
        }
    }
}

module.exports = State;
