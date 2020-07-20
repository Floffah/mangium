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

const fs = require('fs'),
    Path = require('path'),
    low = require('lowdb'),
    fisy = require('lowdb/adapters/FileSync'),
    semver = require('semver'),
    cp = require('child_process'),
    Plugin = require('./Plugin'),
    kindOf = require('kind-of');

class PluginManager {
    constructor(manager) {
        this.manager = manager;
        this._plugins = new Map();
        this._cache = low(new fisy(Path.resolve(this.manager.getPath("plugins"), 'cache.json')));
    }

    installDeps(path, done) {
        let scr = cp.exec("npm install", {cwd: path});
        scr.on('close', code => done(code));
    }

    loadPlugins() {
        global.Plugin = Plugin;
        let paths = fs.readdirSync(this.manager.getPath("plugins"));
        for (let p in paths) {
            if (fs.lstatSync(Path.resolve(this.manager.getPath("plugins"), paths[p])).isDirectory() && fs.existsSync(Path.resolve(this.manager.getPath("plugins"), paths[p], 'package.json'))) {
                let pjson = require(Path.resolve(this.manager.getPath("plugins"), paths[p], 'package.json'));
                let lastknown = "0.0.0";
                if(this._cache.get(`plugins.${pjson.name}.lastKnownVersion`).value() !== undefined) {
                    lastknown = this._cache.get(`plugins.${pjson.name}.lastKnownVersion`).value();
                }
                if (this._cache.get(`plugins.${pjson.name}`) === undefined || semver.lt(lastknown, pjson.version)) {
                    this.installDeps(Path.resolve(this.manager.getPath("plugins"), paths[p]), () => {
                        this._cache.set(`plugins.${pjson.name}.lastKnownVersion`, pjson.version).write();
                        let Main = require(Path.resolve(this.manager.getPath("plugins"), paths[p], pjson.main));
                        let pl = new Main(this.manager);
                        if(kindOf(pl.onLoad) === "function") pl.onLoad(true);
                        this._plugins.set(pjson.name, {
                            inst: pl,
                            enabled: false
                        });
                    });
                } else {
                    let Main = require(Path.resolve(this.manager.getPath("plugins"), paths[p], pjson.main));
                    let pl = new Main(this.manager);
                    if(kindOf(pl.onLoad) === "function") pl.onLoad(false);
                    this._plugins.set(pjson.name, {
                        inst: pl,
                        enabled: false
                    });
                }
                this._cache.set(`plugins.${pjson.name}.lastKnownVersion`, pjson.version).write();
            }
        }
    }

    enablePlugins() {
        this._plugins.forEach((v, k) => {
            if(kindOf(v.inst.onEnable) === "function") v.inst.onEnable();
            this._plugins.set(k, {
                ...v,
                enabled: true
            })
        });
    }

    disablePlugins() {
        this._plugins.forEach((v, k) => {
            if(kindOf(v.inst.onDisable) === "function") v.inst.onDisable();
            this._plugins.set(k, {
                ...v,
                enabled: false
            })
        });
    }

    unloadPlugins() {
        this._plugins.forEach((v, k) => {
            if(kindOf(v.inst.onUnload) === "function") v.inst.onUnload();
            this._plugins.delete(k);
        });
    }

    loadPlugin(path) {
        if (fs.lstatSync(Path.resolve(this.manager.getPath("plugins"), path)).isDirectory() && fs.existsSync(Path.resolve(this.manager.getPath("plugins"), path, 'package.json'))) {
            let pjson = require(Path.resolve(this.manager.getPath("plugins"), path, 'package.json'));
            if (this._cache.get(`plugins.${pjson.name}`) === undefined || semver.lt(this._cache.get(`plugins.${pjson.name}.lastKnownVersion`).value(), pjson.version)) {
                this.installDeps(Path.resolve(this.manager.getPath("plugins"), path), () => {
                    let Main = require(Path.resolve(this.manager.getPath("plugins"), path, pjson.main));
                    let pl = new Main(this.manager);
                    if(kindOf(pl.onLoad) === "function") pl.onLoad(true);
                    this._plugins.set(pjson.name, {
                        inst: pl,
                        enabled: false
                    });
                });
            } else {
                let Main = require(Path.resolve(this.manager.getPath("plugins"), path, pjson.main));
                let pl = new Main(this.manager);
                if(kindOf(pl.onLoad) === "function") pl.onLoad(false);
                this._plugins.set(pjson.name, {
                    inst: pl,
                    enabled: false
                });
            }
            this._cache.set(`plugins.${pjson.name}.lastKnownVersion`, pjson.version).write();
        }
    }

    enablePlugin(name) {
        let p = this._plugins.get(name);
        if (p !== undefined) {
            p.inst.onEnable();
            if(kindOf(p.inst.onEnable) === "function") p.inst.onEnable();
            this._plugins.set(name, {
                ...p,
                enabled: true
            });
        }
    }

    disablePlugin(name) {
        let p = this._plugins.get(name);
        if (p !== undefined) {
            if(kindOf(p.inst.onDisable) === "function") p.inst.onDisable();
            this._plugins.set(name, {
                ...p,
                enabled: false
            });
        }
    }

    unLoadPlugin(name) {
        let p = this._plugins.get(name);
        if (p !== undefined) {
            if(kindOf(p.inst.onUnload) === "function") p.inst.onUnload();
            this._plugins.delete(name);
        }
    }
}

module.exports = PluginManager;
