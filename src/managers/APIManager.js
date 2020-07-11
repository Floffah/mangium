/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const Path = require('path'),
    express = require('express'),
    async = require('async'),
    fs = require('fs'),
    bparse = require('body-parser');

class APIManager {
    constructor(webmanager) {
        this._webmanager = webmanager;

        this._points = {
            '/get/state': 'getState',

            '/err/none': 'noneErr',
        }

        this._endpoints = new Map();
    }

    create() {
        this._apir = express.Router();

        fs.readdirSync(Path.resolve(__dirname, '../endpoint')).forEach((file) => {
            if(fs.statSync(Path.resolve(__dirname, '../endpoint', file)).isDirectory()) {
                fs.readdirSync(Path.resolve(__dirname, '../endpoint', file)).forEach(fl => {

                    let f = require(Path.resolve(__dirname, '../endpoint', file, fl));
                    let Endpoint = new f(this._webmanager.manager);
                    if (Endpoint.info.path !== undefined) {
                        this._endpoints.set(Endpoint.info.path, Endpoint);
                    } else {
                        Endpoint = undefined;
                        throw new Error("Endpoint does not have a path")
                    }

                });
            } else {

                let fl = require(Path.resolve(__dirname, '../endpoint', file));
                let Endpoint = new fl(this._webmanager.manager);
                if (Endpoint.info.path !== undefined) {
                    this._endpoints.set(Endpoint.info.path, Endpoint);
                } else {
                    Endpoint = undefined;
                    throw new Error("Endpoint does not have a path")
                }

            }
        })
        this._apir.use(bparse.json());
        this._apir.use('/api/v1', (req, res, next) => {
            this.handlev1(req, res);
        });

        this._webmanager.app.use('/', this._apir);
    }

    handlev1(req, res) {
        let path = req.path.replace("/api/v1", "");
        if (this._endpoints.get(path) === null || this._endpoints.get(path) === undefined) {
            res.status(400).json({
                error: 'noPath'
            });
        } else {
            let endpoint = this._endpoints.get(path);
            if (endpoint.info.types.includes(req.method.toLowerCase())) {
                let response;
                if (req.method === 'POST') {
                    response = endpoint.run({path: req.path, type: req.method.toLowerCase()}, req.body, res);
                } else {
                    response = endpoint.run({path: req.path, type: req.method.toLowerCase()}, undefined, res);
                }
                if(Promise.resolve(response) === response) {
                    response.then(resp => res.status(200).json(resp))
                } else if((response && response.nosend) !== true) {
                    res.status(200).json(response);
                }
                return true;
            } else {
                res.status(400).json({
                    error: 'methodNotAccepted'
                });
            }
        }
    }

    get endpoints() {
        return this._endpoints;
    }

    get webmanager() {
        return this._webmanager;
    }
}

module.exports = APIManager;
