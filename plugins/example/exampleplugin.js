/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

class ExamplePlugin extends Plugin {
    constructor(p) {
        super(p);
    }

    onEnable() {
        this.manager.getLogger().info("Example plugin enabled");
    }

    onDisable() {
        this.manager.getLogger().info("Example plugin disabled");
    }
}

module.exports = ExamplePlugin;
