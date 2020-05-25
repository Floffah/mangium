/*
 *     Copyright (C) 2020   Floffah
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *     @author Floffah & Mangium Contributors
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
        let message = chalk`{blue ${timestamp("HH:mm.ss")}} ${sts}: ${type === "error" || type === "fatal" ? chalk`{red ${messages.join(" ")}}` : messages.join(" ")} {cyan +${newer - this.last}ms}`;
        console.log(message);
        this.last = newer;
    }
}

module.exports = Logger;
