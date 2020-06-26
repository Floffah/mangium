/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

class Permissions {
    constructor(perms) {
        if (perms) {
            this._perms = perms;
        } else {
            this._perms = {};
        }
    }

    /**
     *
     * @param permission
     * @returns {boolean}
     */
    hasPermission(permission) {
        if (this._perms.override === "all" || this._perms.override === "ALL") {
            return true;
        } else if ((Object.keys(this._perms).includes(permission) && this._perms[permission] === "all")) {
            return true;
        } else {
            return false;
        }
    }

    hasPermissions(permissions) {
        let does = true;
        permissions.forEach((p) => {
            let doeshave = this.hasPermission(p)
            if (doeshave === false) does = false;
        });
        return does;
    }

    setPermission(permission, type) {
        this._perms[permission] = type === true ? "all" : "none";
    }

    toObject() {
        return this._perms;
    }
}

module.exports = Permissions;
module.exports.preset = {
    normal() {
        return new Permissions({
            override: "none"
        });
    }
}
