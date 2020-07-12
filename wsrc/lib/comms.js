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

function settingSet(settings, setup) {
    let toSend = [];
    settings.forEach(s => {
        if(setting[s.name]) {
            let setting = translateSetting(s.name);
            toSend.push({
                at: setting.at,
                setting: setting.setting,
                value: s.value
            })
        }
    });
    while(toSend.length >= settings.length) {
        return post("/settings", {
            "access-code": setup === true ? "setup" : localStorage.getItem("access_code"),
            settings: toSend,
            type: "set"
        });
    }
}

function settingGet(settings) {
    let toSend = [];
    settings.forEach(s => {
        if(setting[s.name]) {
            let setting = translateSetting(s.name);
            toSend.push({
                at: setting.at,
                setting: setting.setting
            })
        }
    });
    return post("/settings", {
        "access-code": localStorage.getItem("access_code"),
        settings: toSend,
        type: "get"
    })
}

export {
    post,
    get,
    settingSet,
    settingGet,
}

let setting = {
    "memint": ["memorySaveInterval", "settings"],
    "unsplash": ["keys.unsplash", "config"]
}

function translateSetting(name) {
    return {
        setting: setting[name][0],
        at: setting[name][1]
    }
}
