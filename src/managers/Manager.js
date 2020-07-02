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
    DatabaseManager = require('./DatabaseManager'),
    DockerManager = require('../docker/DockerManager'),
    Events = require('../events/Events'),
    PluginManager = require('../plugins/PluginManager');

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
            ["err", Path.join(__dirname, '../../data/logs/errors')],
            ["keys", Path.join(__dirname, '../../data/keys')],
            ["plugins", Path.join(__dirname, '../../plugins')]
        ]);
        this._paths.forEach((v) => {
            if (!fs.existsSync(v)) {
                fs.mkdirSync(v);
            }
        });
        this._logger = new Logger(this, false);
        this._initialized = false;
        this.dodb = false;
    }

    initialize() {
        this.getLogger().info("Initialising mangium...");

        this._events = new Events();

        // config
        if (!fs.existsSync(Path.join(this.getPath("config"), "config.json"))) {
            this._config = low(new fisy(Path.join(this.getPath("config"), 'config.json')));
            this._config.defaults({
                web: {
                    hostname: "127.0.0.1",
                    port: 3000
                },
                database: {
                    type: "sqlite"
                },
                settings: {
                    setup: false
                },
                docker: {
                    version: "v1.40",
                    socketPath: "//./pipe/docker_engine"
                },
                enable: {
                    webpanel: true,
                    api: true
                }
            }).write()
        } else {
            this._config = low(new fisy(Path.join(this.getPath("config"), 'config.json')));
        }

        // db load
        this._dbManager = new DatabaseManager(this);
        this._dbManager.init();

        // db web create
        if (this._config.get("enable.webpanel").value() === true) {
            this._webManager = new WebManager(this);
            this._webManager.create();
        }

        // docker create
        this._dockerManager = new DockerManager(this);
        this._dockerManager.init();

        // plugins craete
        this._pluginManager = new PluginManager(this);
        this._pluginManager.loadPlugins();

        // finish initialize
        this._initialized = true;

        this.load();
    }

    load() {
        // web start
        if (this._config.get("enable.webpanel").value() === true) {
            this._webManager.listen();
            if (this._config.get("settings.setup").value() !== true) {
                this._webManager.needSetup();
            }
        }

        // end if in build mode
        if (this._options.cibdone !== undefined) {
            this._options.cibdone(this._errors.length >= 1, this._errors);
        }

        if (this._config.get("enable.webpanel").value() === true) {
            this._webManager.started();
        }

        // do epic plugin stuff
        this._pluginManager.enablePlugins();
    }

    end() {
        if (this._config.get("enable.webpanel").value() === true) {
            this._webManager.stop();
        }
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
     * @returns {If<*[AsyncProperty], Promise<Lowdb.Lowdb<RecursivelyExtend<*[ReferenceProperty], AsyncTag>, *>>,
     *     Lowdb.Lowdb<RecursivelyExtend<*[ReferenceProperty], SyncTag>, *>> | If<*[AsyncProperty],
     *     Promise<Lowdb.Lowdb<RecursivelyExtend<*[ReferenceProperty], AsyncTag>, *>>,
     *     Lowdb.Lowdb<RecursivelyExtend<*[ReferenceProperty], SyncTag>, *>>}
     */
    getConfig() {
        return this._config;
    }

    /**
     *
     * @returns {DatabaseManager}
     */
    getDbManager() {
        return this._dbManager;
    }

    /**
     *
     * @returns {DockerManager}
     */
    getDockerManager() {
        return this._dockerManager;
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
        if (this._config.get("enable.webpanel").value() === true) {
            return this._webManager;
        } else {
            return null;
        }
    }
}

module.exports = Manager;

/**
 * @callback cibdone
 * @param {boolean} diderr
 * @param {Error[]} [err]
 */
