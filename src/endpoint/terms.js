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
const uuid = require('uuid');
const fs = require('fs');
const Path = require('path');
const low = require('lowdb');
const fisy = require('lowdb/adapters/FileSync');

class Terms extends Endpoint {
    constructor(props) {
        super(props, {
            path: '/terms',
            types: ['post'],
            description: 'Create a terms and conditions session and get the terms and conditions markdown file.',
            errors: ['incoSignature', 'largeTimeDiff']
        });

        this._namespace = uuid.v5(this.manager.getConfig().get("web.hostname").value(), uuid.v5.URL);
        this._termsessions = new Map();
        this._termslink = {};
    }

    run(reqinfo, info) {
        let termsession;
        if(info.type === "finish") {
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
            if(info.accepted === true) {
                this.manager.getConfig().set("info.terms", {
                    time: Date.now(),
                    accepted: true
                }).write();
                return {
                    success: true
                }
            } else {
                this.manager.getConfig().set("info.terms", {
                    time: Date.now(),
                    accepted: false
                }).write();
                return {
                    success: true
                }
            }
        } else if(info.type === "init") {
            termsession = uuid.v5(info.signature, this._namespace);
            this._termsessions.set(termsession, {
                signature: info.signature,
                time: Date.now()
            });
            this._termslink[info.signature] = termsession;
            return {
                md: fs.readFileSync(Path.resolve(__dirname, '../../wsrc/markdown', 'terms.md'), 'utf8'),
            }
        }
    }
}

module.exports = Terms;
