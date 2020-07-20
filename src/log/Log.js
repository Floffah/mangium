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
let chalk = require('chalk'),
    fs = require('fs'),
    Path = require('path'),
    timestamp = require('time-stamp');

class Logger {
    /**
     * Custom logger. Inspired by [PocketNodeX's logger](https://github.com/HerryYT/PocketNodeX/blob/master/src/pocketnode/logger/Logger.js)
     * @param {Manager} manager
     * @param {boolean} [doFile]
     */
    constructor(manager, doFile) {
        this.logpath = Path.join(manager.getPath("data"), "logs", `${timestamp("YYYY-DD-MM-HH.mm.ss")}.log`);
        if(doFile === true) {
            fs.writeFileSync(this.logpath, "log start");
            this.logfile = fs.createWriteStream(this.logpath);
        }
        this._dofile = doFile;
        this.last = Date.now();
    }

    /**
     * @param {String} messages
     */
    info(...messages) {
        this.log("info", messages);
    }

    /**
     * @param {String} messages
     */
    warn(...messages) {
        this.log("warn", messages);
    }

    /**
     * @param {String} messages
     */
    err(...messages) {
        this.log("error", messages);
    }

    /**
     * @param {String} messages
     */
    fatal(...messages) {
        this.log("fatal", messages);
    }

    /**
     * @param {String} type
     * @param {String[]} messages
     */
    log(type, messages) {
        if(this._dofile === true) {
            this.logfile.write(`${new Date()} [${type}] ${messages.join(" ")}\n`);
        }
        let sts = "";
        switch(type) {
            case "info":
                sts = chalk`{blue info}`;
                break;
            case "error":
                sts = chalk`{red error}`;
                break;
            case "fatal":
                sts = chalk`{red.bold FATAL}`;
                break;
            case "warn":
                sts = chalk`{yellow warn}`;
                break;
            default:
                sts = chalk`{blue info}`;
                break;
        }
        let newer = Date.now();
        let message = chalk`{blue ${timestamp("HH:mm.ss")}} ${sts} ${type === "error" || type === "fatal" ? chalk`{red ${messages.join(" ")}}` : messages.join(" ")} {cyan +${newer - this.last}ms}`;
        console.log(message);
        this.last = newer;
    }
}

module.exports = Logger;
