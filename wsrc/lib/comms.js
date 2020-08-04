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

import axios from 'axios';
import {changePage} from "../ui";

/**
 *
 * @param {string} path
 * @param {object} data
 * @returns {Promise}
 */
function post(path, data) {
    return new Promise((resolve, reject) => {
        axios.post("/api/v1" + path, data).then((res) => {
            if(res.data.error) {
                if(res.data.error === "invalidUser") {
                    localStorage.removeItem("access_code");
                    changePage("/login")
                }
            } else {
                resolve(res);
            }
        });
    })
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
    for (let st in settings) {
        let s = settings[st];
        if (setting[s.name]) {
            let setting = translateSetting(s.name);
            toSend.push({
                at: setting.at,
                setting: setting.setting,
                value: s.value
            })
        }
    }
    return post("/settings", {
        "access-code": setup === true ? "setup" : localStorage.getItem("access_code"),
        settings: toSend,
        type: "set"
    });
}

function settingGet(settings) {
    let toSend = [];
    for (let st in settings) {
        let s = settings[st];
        if (setting[s.name]) {
            let setting = translateSetting(s.name);
            toSend.push({
                at: setting.at,
                setting: setting.setting
            });
        }
    }
    return post("/settings", {
        "access-code": localStorage.getItem("access_code"),
        settings: toSend,
        type: "get"
    });
}

export {
    post,
    get,
    settingSet,
    settingGet,
}

let setting = {
    "memint": ["memorySaveInterval", "settings"],
    "unsplash": ["keys.unsplash", "config"],
    "panellinks": ["panelLinks", "settings"]
}

function translateSetting(name) {
    return {
        setting: setting[name][0],
        at: setting[name][1]
    }
}
