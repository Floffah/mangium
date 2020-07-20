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

class Endpoint {
    /**
     *
     * @param {Manager} manager Just pass the first argument in your constructor
     * @param {object} info Endpoint info
     * @param {string} info.path Path of endpoint (after /api/v1). Must start with /
     * @param {'get'|'post'} info.type Request method
     * @param {string} info.description Endpoint description
     * @param {string[]} [info.errors] Possible errors that might be returned
     * @param {object[]} [info.posts] What should be in a post request
     * @param {object[]} info.returns Information that might be returned
     */
    constructor(manager, info) {
        this.info = info;
        this.manager = manager;
    }

    /**
     * @param {object} reqinfo Info about the request
     * @param {'get'|'post'} reqinfo.type Request method
     * @param {String} reqinfo.path Request path
     * @param {object} [data] Data sent with the request. Only in post requests
     * @param {express.Response} res
     */
    run(reqinfo, data, res) { }
}

module.exports = Endpoint;
