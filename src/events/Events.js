/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */
const kindOf = require('kind-of');

class Events {
    constructor() {
        this.handlers = {};
    }

    /**
     * Subscribe to an event
     * @param {String} event
     * @param fn
     * @returns {boolean}
     */
    subscribe(event, fn) {
        if (kindOf(this.handlers[event]) !== "array") {
            this.handlers[event] = [];
        }
        this.handlers[event].push(fn);
        return true;
    }

    /**
     * Unsubscribe from an event
     * @param {String} event
     * @param fn
     * @returns {boolean}
     */
    unsubscribe(event, fn) {
        if (kindOf(this.handlers[event]) === "array") {
            this.handlers[event].splice(this.handlers[event].indexOf(fn), 1);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Fire an event
     * @param {String} event
     * @param {any} args
     * @returns {boolean}
     */
    fire(event, ...args) {
        if (kindOf(this.handlers[event]) === "array") {
            let ran = 0;
            for (let i in this.handlers[event]) {
                this.handlers[event][i](...args);
                ran++;
                if(ran >= this.handlers[event].length) {
                    return true;
                }
            }
        } else {
            return false;
        }
    }
}

module.exports = Events;
