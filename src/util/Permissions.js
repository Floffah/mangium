/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

class Permissions {
    constructor(perms) {
        if(perms) {
            this._perms = perms;
        } else {
            this._perms = {};
        }
    }

    hasPermission(permission) {
        if(this._perms.override === "all") {
            return true;
        }
    }

    setPermission() {

    }

    toObject() {
        return this._perms;
    }
}

module.exports = Permissions;
module.exports = {
    presets: {
        normal() {
            return new Permissions({
                override: "none"
            });
        }
    }
}
