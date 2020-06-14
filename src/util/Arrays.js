/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

module.exports = (data) => {
    return new Arrays(data);
}

class Arrays {
    constructor(data) {
        this.data = data;
    }

    hasExact(compare) {
        let yes = false;
        let done1 = 0,
            done2 = 0;
        if(typeof compare === 'object') {
            this.data.forEach((part) => {
                done1++
                Object.keys(compare).forEach((key) => {
                    if(part[key] && part[key] === compare[key]) {
                        yes = true;
                    }
                    done2++
                });
            });

            while(done1 >= this.data.length && done2 >= Object.keys(compare).length) {
                return yes;
                break;
            }
        }
    }
}
