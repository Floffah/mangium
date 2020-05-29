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

const chalk = require('chalk');

console.log(chalk.green("    Mangium  Copyright (C) 2020  Floffah & Mangium Contributors\n" +
    "    This program comes with ABSOLUTELY NO WARRANTY; for details see the \"LICENSE\" file.\n" +
    "    This is free software, and you are welcome to redistribute it\n" +
    "    under certain conditions; for details see the \"LICENSE\" file."))

let Manager = require('./managers/Manager');

const IOHandler = require('./handler/IOHandler');

if (process.argv.includes("--cib")) {
    let manager = new Manager({
        cib: true,
        cibdone() {
            manager.end();
            process.exit(0);
        }
    });
    require('./handler/errorHandlers').reg(manager);

    manager.initialize();
    let ioh = manager.getWebManager().handle("io", IOHandler);

    manager.load();
} else {
    let manager = new Manager({cib: false});
    require('./handler/errorHandlers').reg(manager);

    manager.initialize();
    let ioh = manager.getWebManager().handle("io", IOHandler);

    manager.load();

}
