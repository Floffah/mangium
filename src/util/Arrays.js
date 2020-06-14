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

    /**
     * Check if an array of objects has certain keys and values inside those objects
     * @param {object} compare Object to compare
     * @returns {boolean}
     */
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

    /**
     * Check if an array of objects has certain keys inside those objects
     * @param {String[]} compare Array of keys
     * @returns {boolean}
     */
    has(compare) {
        let yes = false;
        let done1 = 0,
            done2 = 0;
        if(Array.isArray(compare)) {
            this.data.forEach((part) => {
                done1++
                compare.forEach((key) => {
                    if(part[key]) {
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
