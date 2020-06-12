/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
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
     */
    run(reqinfo, data) {}
}

module.exports = Endpoint;
