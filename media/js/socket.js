/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

let eventhandlers = {}

function handle(data) {
    if (eventhandlers[data.event] !== undefined) {
        eventhandlers[data.event].forEach((fn) => {
            fn(data.data)
        });
    }
}

/**
 *
 * @param {String} event
 * @param {eventHandlerCallback} fn
 */
function registerHandler(event, fn) {
    if (eventhandlers[event] === undefined) {
        eventhandlers[event] = []
    }
    eventhandlers[event].push(fn)
}

export default {registerHandler, handle}

/**
 * @callback eventHandlerCallback
 * @param {object} data
 */
