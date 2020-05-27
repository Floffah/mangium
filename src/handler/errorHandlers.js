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

const uuid = require('uuid'),
    Path = require('path'),
    fs = require('fs');

module.exports.reg = (manager) => {
    function errhandle(err, origin) {
        let erruuid = uuid.v4(),
            path = Path.resolve(manager.getPath("err"), `${erruuid}.err`);
        fs.writeFileSync(path, `${err.stack}`);
        if(typeof origin === "string") {
            manager.getLogger().err(`An error has occured. Origin: ${origin}.`);
        } else {
            manager.getLogger().err(`An error has occured.`);
        }
        manager.getLogger().err(`See more information at ${path}`);
    }
    process.on('uncaughtException', errhandle);
    process.on('unhandledRejection', errhandle);
    process.on('rejectionHandled', errhandle);
};
