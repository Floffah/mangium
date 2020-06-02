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

let Net = require('net'),
    fs = require('fs'),
    path = require('path');

class TcpConnection {
    /**
     *
     * @param {APIManager} apimanager
     */
    constructor(apimanager) {
        this._am = apimanager;
    }

    start() {
        this._server = Net.createServer(this.connection);
    }

    /**
     *
     * @param {Net.Socket} conn
     */
    connection(conn) {
        conn.on('data', (data) => {
            if(JSON.parse(data)) {
                this.data(conn, JSON.parse(data));
            }
        });
    }

    /**
     *
     * @param {Net.Socket} conn
     * @param data
     */
    data(conn, data) {
        if(data.event && this._am.hasEvent(data.event)) {
            this._am.triggerEvent(data.event, data);
        }
    }
}

module.exports = TcpConnection;
