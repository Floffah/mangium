/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const fs = require('fs');

class QueryFile {
    constructor(filepath) {
        this._filepath = filepath;
        this._queries = {};
        if (fs.existsSync(filepath)) {
            this._init();
        } else {
            throw new Error('File ' + filepath + ' does not exist');
        }
    }

    _init() {
        let fparts = fs.readFileSync(this._filepath, 'utf8').split(/[\r\n],,[\r\n]/);
        fparts.forEach((part) => {
            if(part.split(/\n\r/)[0].match(/(-\s(\w+)|-(\w+))/)) {
                let name = part.split(/\r\n/)[0].replace(/(-\s|-)/, "");
                let partl = part.split(/\r\n/);
                partl.shift();
                this._queries[name] = partl
            } else {
                throw new Error('Query at line ' + fs.readFileSync(this._filepath, 'utf8').split("\n").indexOf(part) + ' has no name');
            }
        });
    }

    get(query, replacers) {
        if(this._queries[query] !== undefined) {
            let query = this._queries[query];
            Object.keys(replacers).forEach((replacer) => {
                query.replace(new RegExp("{{" + replacer + "}}", 'g'), replacers[replacer]);
            });
            return query;
        } else {
            throw new Error("Found no query " + query);
        }
    }
}

module.exports = QueryFile;
