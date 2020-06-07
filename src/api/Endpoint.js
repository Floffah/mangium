/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

class Endpoint {
    /**
     *
     * @param {Manager} manager
     * @param {object} info
     * @param {String} info.path
     * @param {'get'|'post'} info.type
     */
    constructor(manager, info) {
        this.info = info;
        this.manager = manager;
    }

    /**
     * @param {object} reqinfo
     * @param {'get'|'post'} reqinfo.type
     * @param {String} reqinfo.path
     * @param {object} [data]
     */
    run(reqinfo, data) {}
}

module.exports = Endpoint;
