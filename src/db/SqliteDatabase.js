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

const Path = require('path'),
    QueryFile = require('./QueryFile');

class SqliteDatabase {
    constructor(dbManager) {
        this._dbManager = dbManager;
        this._dbManager.manager.setPath("db", Path.resolve(this._dbManager.manager.getPath("data"), 'db'));
        this._queries = new QueryFile(Path.resolve(__dirname, 'sqlite.queries'));
    }

    init() {

    }
}

module.exports = SqliteDatabase;
