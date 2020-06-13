/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const Logger = require('../log/Log'),
    Path = require('path'),
    fs = require('fs'),
    chalk = require('chalk'),
    WebManager = require('./WebManager'),
    low = require('lowdb'),
    fisy = require('lowdb/adapters/FileSync'),
    Database = require('../db/Database'),
    Sqlite = require('../db/SqliteType'),
    knex = require('knex');

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
            ["logs", Path.join(__dirname, '../../data/logs')],
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

        this._systemDb = new Database(Sqlite, {
            path: Path.resolve(this.getPath("db"), 'system.sqlite'),
        });
        this._systemDb.run(knex('settings').create());

        this._webManager = new WebManager(this);
        this._webManager.create();

        this._initialized = true;
    }

    load() {
        this._webManager.listen();
        if(this._config.get("setup").value() !== true) {
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

    /**
     *
     * @returns {Logger}
     */
    getLogger() {
        return this._logger;
    }

    /**
     * Get the api manager.
     * @returns {WebManager}
     */
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
