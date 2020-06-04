/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const Handler = require('./Handler');

class IOHandler extends Handler {
    constructor(manager, opts) {
        super(manager, "IO");
        this._manager = manager;
        this._answers = [];
    }

    connection(socket) {
        if (this._manager.getWebManager().getState() === "setup") {
            socket.emit('data', {event: "setup"});
        }
    }

    onListen() {
        this.io = require('socket.io')(this._manager.getWebManager().server);
        this.io.on('connection', (socket) => {
            this.connection(socket);
        });
    }

    needSetup() {

    }
}

module.exports = IOHandler;
