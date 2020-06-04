/*
 *     Copyright (C) 2020   Floffah
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
