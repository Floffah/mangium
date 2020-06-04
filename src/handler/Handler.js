/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

class Handler {
    /**
     *
     * @param {Manager} manager
     * @param {String} name
     */
    constructor(manager, name) {
        this._name = name;
    }

    /**
     * Fired right before the server starts listening
     */
    onListen() {
    };

    /**
     * Fired when Mangium needs to be set up.
     */
    needSetup() {
    }
}

module.exports = Handler;
