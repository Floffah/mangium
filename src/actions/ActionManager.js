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

const kindOf = require('kind-of'),
    ActionEvent = require('./Action').ActionEvent;

const UserEdit = require('./builtin/UserEdit');

class ActionManager {
    constructor(manager) {
        this.manager = manager;
        this.actions = new Map();
    }

    /**
     * Fire an action
     * @param {String} name
     * @param {object} data
     */
    fireAction(name, data) {
        let action = this.actions.get(name);
        if(action) {
            let ev = new ActionEvent();
            action.onAction(data, ev);
            if(ev.isShown()) {
                this.logAction(name, data, ev);
            }
        } else {
            throw new Error("Could not find action " + name);
        }
    }

    /**
     * Register an action
     * @param {String} name Name of action
     * @param {Action} Actionclass Class extends Action
     */
    registerAction(name, Actionclass) {
        this.actions.set(name, new Actionclass());
    }

    translateAction(data, message) {
        let replacers = Object.keys(data);
        let newmsg = message + "";

        for(let r in replacers) {
            let replacer = replacers[r];
            newmsg.replace(new RegExp("{{" + replacer + "}}", 'g'), data[replacer]);
        }

        return newmsg;
    }

    logAction(name, data, ev) {
        let message = this.translateAction(data, action.info.message);
        let action = this.actions.get(name);

        this.manager.getDbManager().getDbs().systemDb.run(this.manager.getDbManager().q.actions.logAction()).run(name, data, message, Date.now());
    }

    initDefaults() {
        this.registerAction('userEdit', UserEdit);
    }
}
