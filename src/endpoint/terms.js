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
            path: '/terms',
            types: ['get', 'post']
        });

        this._namespace = uuid.v5(this.manager.getWebManager().config.get("hostname").value(), uuid.v5.URL);
        this._termsessions = new Map();
        this._termslink = {};
    }

    run(reqinfo, info) {
        let termsession;
        if(reqinfo.type === "post") {
            termsession = this._termslink[info.signature];
            if(!termsession) {
                return {
                    error: 'incoSignature'
                }
            }
            if((Date.now - parseInt(this._termsessions.get(termsession).time)) > 300000) {
                return {
                    error: 'largeTimeDiff'
                }
            }
            let config = low(new fisy(Path.join(this.getPath("config"), 'config.json')));
            if(info.accepted === true) {
                config.set("terms", {
                    time: Date.now(),
                    accepted: true
                }).write();
                return {
                    success: true
                }
            } else {
                config.set("terms", {
                    time: Date.now(),
                    accepted: false
                }).write();
                return {
                    success: true
                }
            }
        } else if(reqinfo.type === "get") {
            termsession = uuid.v5(info.signature, this._namespace);
            this._termsessions.set(termsession, {
                signature: info.signature,
                time: Date.now()
            });
            this._termslink[info.signature] = termsession;
            return {
                md: fs.readFileSync(path.resolve(__dirname, '../../media/markdown', 'terms.md'), 'utf8'),
            }
        }
    }
}

module.exports = Terms;
