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

const Action = require('../Action').Action;

class UserEdit extends Action {
    constructor() {
        super({
            name: "userEdit",
            displayname: "User Edit",
            description: "The user edit action.",
            message: "User {{user}} edited user {{target}}",
            variables: {
                user: "string",
                target: "string"
            }
        });
    }

    onAction(data, actionevent) {
        actionevent.showOnList(true);
    }
}

module.exports = UserEdit;
