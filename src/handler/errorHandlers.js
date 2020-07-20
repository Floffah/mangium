/*
 *     Copyright (C) 2020   Floffah
 *     All rights reserved
 *
 *     See GNU GPL v3 license
 *
 *     See file copyright for individual contributors information
 *
 *     @author Floffah
 *     @link https://github.com/floffah/
 */

const uuid = require('uuid'),
    Path = require('path'),
    fs = require('fs'),
    stacktrace = require('stacktrace-parser');

module.exports.reg = (manager) => {
    function errhandle(err, origin) {
        let erruuid = uuid.v4(),
            path = Path.resolve(manager.getPath("err"), `${erruuid}.err`);
        if(err) {
            fs.writeFileSync(path, JSON.stringify({
                error: {
                    message: err.message,
                    stack: err.stack,
                    code: err.code
                },
                stacktrace: stacktrace.parse(err.stack)
            }, null, 2));
        }
        if(typeof origin === "string") {
            manager.getLogger().err(`An error has occured. Origin: ${origin}.`);
        } else {
            manager.getLogger().err(`An error has occured.`);
        }
        if(err) {
            manager.getLogger().err(`See more information at ${path}`);
            manager.passError(err);
        }
    }
    process.on('uncaughtException', errhandle);
    process.on('unhandledRejection', errhandle);
    process.on('rejectionHandled', errhandle);
};

module.exports.saveErr = (manager, err, message) => {
    let erruuid = uuid.v4(),
        path = Path.resolve(manager.getPath("err"), `${erruuid}.err`);
    if(err) {
        fs.writeFileSync(path, `${err.stack}`);
    }
    if(typeof message === "string") {
        manager.getLogger().err(`An error has been saved. Message: ${message}.`);
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
