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

class Action {
    /**
     *
     * @param info
     * @param {String} [info.name] Action name. Must be camel case. Display name will be camel cased if this is not defined
     * @param {String} info.displayname Display name. Required.
     * @param {String} info.[description] Description displayed in action help list
     * @param {String} info.message Message shown in action list. You can use \{\{variables\}\} passed to the action event.
     * @param {String} info.icon Name or path of icon. Translated to Ant Design icon if using an icon name.
     */
    constructor(info) {
        this.info = info;
    }

    /**
     * Ran when this action is fired.
     * @param {object} data An object of variables passed.
     * @param {ActionEvent} actionevent The action event.
     */
    onAction(data, actionevent) {};
}

class ActionEvent {
    constructor() {
        this.show = true;
    }

    /**
     * Whether or not this action should be shown on the action log.
     * @param {boolean} a
     */
    showOnList(a) {
        this.show = a;
    };
}

module.exports = {
    Action, ActionEvent
}
