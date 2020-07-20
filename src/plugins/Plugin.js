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

class Plugin {
    /**
     * Mangium Plugin class
     * @param {Manager} manager - Manager
     * @example
     * class ExamplePlugin extends Plugin {
     *     constructor(p) {
     *         super(p);
     *     }
     *
     *     onEnable() {
     *         this.manager.getLogger().info("Example plugin enabled");
     *     }
     *
     *     onDisable() {
     *         this.manager.getLogger().info("Example plugin disabled.");
     *     }
     * }
     * module.exports = ExamplePlugin;
     */
    constructor(manager) {
        this.manager = manager;
    }

    /**
     * Ran when the plugin is loaded. Just after the events, database manager, and web manager are initialized.
     * @param {boolean} deps Whether or not dependencies needed to be installed prior to loading the plugin.
     */
    onLoad(deps) {}

    /**
     * Ran when the plugin is unloaded. Just before the plugin is removed from memory.
     */
    onUnload() {}

    /**
     * Ran when the plugin is enabled. Most likely to be after the web manager and api manager are listening for requests.
     */
    onEnable() {}

    /**
     * Ran when the plugin is disabled.
     */
    onDisable() {}
}

module.exports = Plugin;
