/*
 *     Copyright (C) 2020   Floffah
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
        if(err) {
            fs.writeFileSync(path, `${err.stack}`);
        }
        if(typeof origin === "string") {
            manager.getLogger().err(`An error has occured. Origin: ${origin}.`);
        } else {
            manager.getLogger().err(`An error has occured.`);
        }
        if(err) {
            manager.getLogger().err(`See more information at ${path}`);
            manager.passError(err);
        } else {
            console.log(arguments);
        }
    }
    process.on('uncaughtException', errhandle);
    process.on('unhandledRejection', errhandle);
    process.on('rejectionHandled', errhandle);
};
