/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import axios from 'axios';

/**
 *
 * @param {string} path
 * @param {object} data
 * @returns {Promise}
 */
function post(path, data) {
    return axios.post("/api/v1" + path, data);
}

/**
 *
 * @param {string} path
 * @returns {Promise}
 */
function get(path) {
    return axios.get("/api/v1" + path);
}

export {
    post,
    get
}
