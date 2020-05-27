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

<<<<<<< HEAD
class IOHandler extends Handler {
    constructor(manager, opts) {
        super("IO");

        this._webmanager = undefined;
    }

    connection(socket) {
        socket.on('connection', (skt) => {
            if(this._webmanager.getState() === "setup") {
                skt.emit('setup')
            }
=======
class IOHandler extends Handler{
    constructor(manager, opts) {
        super("IO");
    }

    connection(socket) {
        socket.on('data', (dt) => {

>>>>>>> 919e4e5b169cb9ffe8a376d28015e0ce9e1b324c
        });
    }

    onListen(webmanager) {
        webmanager.io = require('socket.io')(webmanager.server);
        webmanager.io.on('connection', this.connection);
<<<<<<< HEAD
        this._webmanager = webmanager;
    }

    needSetup(webmanager) {

=======
>>>>>>> 919e4e5b169cb9ffe8a376d28015e0ce9e1b324c
    }
}

module.exports = IOHandler;
