/*
 *     Copyright (C) 2020   Floffah
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
