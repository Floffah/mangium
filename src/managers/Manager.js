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

const Logger = require('../log/Log'),
    Path = require('path'),
    fs = require('fs'),
    chalk = require('chalk'),
    WebManager = require('./WebManager'),
    DatabaseManager = require('../db/DatabaseManager'),
    SqliteDatabase = require('../db/SqliteDatabase'),
    low = require('lowdb'),
    fisy = require('lowdb/adapters/FileSync');

class Manager {
    /**
     * Mangium manager.
     * @param {object} opts
     * @param {boolean} opts.cib
     * @param {cibdone} opts.cibdone
     */
    constructor(opts) {
        this._options = opts;
        this._errors = [];
        this._paths = new Map([
            ["data", Path.join(__dirname, '../../data')],
            ["config", Path.join(__dirname, '../../data/config')],
            ["cache", Path.join(__dirname, '../../data/cache')],
            ["web", Path.join(__dirname, '../../media/dist')],
            ["db", Path.join(__dirname, '../../data/db')],
            ["err", Path.join(__dirname, '../../data/logs/errors')]
        ]);
        this._paths.forEach((v, k) => {
            if(!fs.existsSync(v)) {
                fs.mkdirSync(v);
            }
        });
        this._logger = new Logger(this, false);
        this._initialized = false;
        this._config = low(new fisy(Path.join(this.getPath("config"), 'config.json')));
    }

    initialize() {
        this.getLogger().info("Initialising mangium...");

        this._dbManager = new DatabaseManager(this);
        this._dbManager.regdb("sqlite", SqliteDatabase);
        this._dbManager.initConfig().then(didset => {
            if(didset === false) {
                this._dbManager.setdb("sqlite");
            }
            this.getLogger().info("Initialised database");
        });

        this._webManager = new WebManager(this);
        this._webManager.create();

        this._initialized = true;
    }

    load() {
        this._webManager.listen();
        if(this._config.get("setup").value() === false) {
            this._webManager.needSetup();
        }

        if(this._options.cibdone !== undefined) {
            this._options.cibdone(this._errors.length >= 1, this._errors);
        }
    }

    end() {
        this._webManager.stop();
        this.getLogger().info("Mangium stopped.");
    }

    /**
     * Pass an error to mangium if there was an error along the way. The error is sent to the cibuild area when it runs cibdone.
     * @param err
     */
    passError(err) {
        this._errors.push(err);
    }

    /**
     * Get a path
     * @param {String} name
     * @returns {String}
     */
    getPath(name) {
        return this._paths.get(name);
    }

    /**
     * Set a path
     * @param {String} name
     * @param {String} path
     */
    setPath(name, path) {
        this._paths.set(name, path);
    }

    getLogger() {
        return this._logger;
    }

    getWebManager() {
        return this._webManager;
    }
}

module.exports = Manager;

/**
 * @callback cibdone
 * @param {boolean} diderr
 * @param {Error[]} [err]
 */
