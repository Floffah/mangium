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

class Terms extends Endpoint {
    constructor(props) {
        super(props, {
            path: '/getkey',
            types: ['post'],
            description: 'Get a specific access key for another service.',
            errors: ['noKeyFound', 'incoInfo', 'incoReq']
        });
    }

    run(reqinfo, info) {
        if(reqinfo.type === "post") {
            this.manager.getConfig().get(`keys.${info.name}`)
        } else {
            return {
                error: 'incoReq',
            }
        }
    }
}

module.exports = Terms;
