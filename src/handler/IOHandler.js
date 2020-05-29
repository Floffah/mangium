/*
 *     Copyright (C) 2020   Floffah
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const Handler = require('./Handler');

class IOHandler extends Handler {
    constructor(manager, opts) {
        super(manager, "IO");
        this._manager = manager;
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
