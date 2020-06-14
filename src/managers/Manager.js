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
    knex = require('knex'),
    arrays = require('../util/Arrays'),
    {saveErr} = require('../handler/errorHandlers');

let q = {
    settings: require('../db/queries/settings')
}

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
            if (!fs.existsSync(v)) {
                fs.mkdirSync(v);
            }
        });
        this._logger = new Logger(this, false);
        this._initialized = false;
        this._config = low(new fisy(Path.join(this.getPath("config"), 'config.json')));
        this.dodb = false;
    }

    initialize() {
        this.getLogger().info("Initialising mangium...");

        // db create
        this._systemDb = new Database({
            path: Path.resolve(this.getPath("db"), 'system.sqlite'),
            type: 'sqlite'
        });

        // db load
        try {
            if (!arrays(this._systemDb.run(q.settings.listTables()).all()).hasExact({name: 'settings'})) {
                this._systemDb.run(q.settings.createTable()).run();
            }
            this.getLogger().info("Database initialised");
            this.dodb = true;
        } catch(e) {
            this.getLogger().warn("Something went wrong while initialising the database. Saving...");
            saveErr(this, new Error("Database could not be initialised."), "Database load error")
        }

        // db web create
        this._webManager = new WebManager(this);
        this._webManager.create();

        // finish initialise
        this._initialized = true;
    }

    load() {
        // web start
        this._webManager.listen();
        if (this._config.get("setup").value() !== true) {
            this._webManager.needSetup();
        }

        // end if in build mode
        if (this._options.cibdone !== undefined) {
            this._options.cibdone(this._errors.length >= 1, this._errors);
        }
    }

    end() {
        this._webManager.stop();
        this.getLogger().info("Mangium stopped.");
    }

    /**
     * Pass an error to mangium if there was an error along the way. The error is sent to the cibuild area when it runs
     * cibdone.
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
