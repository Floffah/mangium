/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const chalk = require('chalk');
const draftlog = require('draftlog');
draftlog(console);

console.log(chalk.green("    Mangium  Copyright (C) 2020  Floffah & Mangium Contributors\n" +
    "    This program comes with ABSOLUTELY NO WARRANTY; for details see the \"LICENSE\" file.\n" +
    "    This is free software, and you are welcome to redistribute it\n" +
    "    under certain conditions; for details see the \"LICENSE\" file."))

let Manager = require('./managers/Manager');

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

    manager.load();

} else {
    if(process.argv.includes("--mem")) trackMem();

    let manager = new Manager({cib: false});
    require('./handler/errorHandlers').reg(manager);

    manager.initialize();

    manager.load();
}

function trackMem() {
    let avgs = [],
        memus = console.draft(chalk`{blue Memory usage:} {green MB}`);

    setInterval(() => {
        let used = process.memoryUsage().heapUsed / 1024 / 1024;

        avgs.push(used);
        if (avgs.length > 30) {
            avgs.shift();
        }

        let total = 0;
        avgs.forEach((avrg) => {
            total += avrg;
        });
        let avg = total / avgs.length;

        memus(chalk`{blue Memory usage:} {green ${Math.round(used * 100) / 100}MB} {blue avg:} {green ${Math.round(avg * 100) / 100}MB}`)
    }, 1000);
}
