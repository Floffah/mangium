/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const Endpoint = require('../api/Endpoint');
const uuid = require('uuid');
const fs = require('fs');
const Path = require('path');
const low = require('lowdb');
const fisy = require('lowdb/adapters/FileSync');
const Unspl = require('unsplash-js');

// MAY BE ADDED BACK IN THE FUTURE FOR NOW ITS JUST BROKEN
class Terms extends Endpoint {
    constructor(props) {
        super(props, {
            path: '/unsplash',
            types: ['post'],
            description: 'Search unsplash.',
            errors: ['noKeyFound', 'incoInfo', 'incoReq']
        });
    }

    run(reqinfo, info) {
        if (reqinfo.type === "post") {
            let key = this.manager.getConfig().get(`keys.unsplash`).value();
            if (key) {
                let splash = new Unspl.default({
                    accessKey: key
                })

                let toreturn = (async () => {
                    let toreturn;
                    let fst = splash.search.photos(info.search, 1, 10)
                    let snd = await fst.then(Unspl.toJson);
                    return {
                        data: snd
                    }
                })();
                splash = null;
                return toreturn;
            } else {
                return {
                    error: "noKeyFound"
                }
            }
        } else {
            return {
                error: 'incoReq',
            }
        }
    }
}

module.exports = Terms;
