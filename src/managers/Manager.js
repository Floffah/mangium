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
<<<<<<< HEAD
    DatabaseManager = require('../db/DatabaseManager'),
    SqliteDatabase = require('../db/SqliteDatabase'),
    low = require('lowdb'),
    fisy = require('lowdb/adapters/FileSync');
=======
    DatabaseManager = require('../db/DatabaseManager');
>>>>>>> 919e4e5b169cb9ffe8a376d28015e0ce9e1b324c

class Manager {
    /**
     * Mangium manager.
     */
    constructor() {
        this._paths = new Map([
            ["data", Path.join(__dirname, '../../data')],
            ["config", Path.join(__dirname, '../../data/config')],
            ["cache", Path.join(__dirname, '../../data/cache')],
            ["web", Path.join(__dirname, '../../media/dist')],
<<<<<<< HEAD
            ["db", Path.join(__dirname, '../../data/db')],
=======
>>>>>>> 919e4e5b169cb9ffe8a376d28015e0ce9e1b324c
            ["err", Path.join(__dirname, '../../data/logs/errors')]
        ]);
        this._paths.forEach((v, k) => {
            if(!fs.existsSync(v)) {
                fs.mkdirSync(v);
            }
        });
        this._logger = new Logger(this, false);
<<<<<<< HEAD
        this._initialized = false;
        this._config = low(new fisy(Path.join(this.getPath("config"), 'config.json')));
=======
        this._dbManager = new DatabaseManager(this);
        this._initialized = false;
    }

    getDatabase() {
        return this._dbManager;
>>>>>>> 919e4e5b169cb9ffe8a376d28015e0ce9e1b324c
    }

    initialize() {
        this.getLogger().info("Initialising mangium...");

<<<<<<< HEAD
        this._dbManager = new DatabaseManager(this);
        this._dbManager.regdb("sqlite", SqliteDatabase);
        this._dbManager.initConfig().then(didset => {
            if(didset === false) {
                this._dbManager.setdb("sqlite");
            }
            this.getLogger().info("Initialised database");
        });
=======
        this._dbManager.init();
>>>>>>> 919e4e5b169cb9ffe8a376d28015e0ce9e1b324c

        this._webManager = new WebManager(this);
        this._webManager.create();

        this._initialized = true;
    }

    load() {
        this._webManager.listen();
<<<<<<< HEAD
        if(this._config.get("setup").value() === false) {
            this._webManager.needSetup();
        }
=======
>>>>>>> 919e4e5b169cb9ffe8a376d28015e0ce9e1b324c
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
<<<<<<< HEAD
     * Set a path
=======
     *
>>>>>>> 919e4e5b169cb9ffe8a376d28015e0ce9e1b324c
     * @param {String} name
     * @param {String} path
     */
    setPath(name, path) {
<<<<<<< HEAD
        this._paths.set(name, path);
=======
        this._paths.set(path, name);
>>>>>>> 919e4e5b169cb9ffe8a376d28015e0ce9e1b324c
    }

    getLogger() {
        return this._logger;
    }
<<<<<<< HEAD

    getWebManager() {
        return this._webManager;
    }
=======
>>>>>>> 919e4e5b169cb9ffe8a376d28015e0ce9e1b324c
}

module.exports = Manager;
