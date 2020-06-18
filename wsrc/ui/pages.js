/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

export default {
    default: () => {
        $("body").removeClass("dots")
    },
    "/starting": () => {
        $("body").addClass("dots")
        return require('../component/ui/Starting');
    },
    "/home": () => {
        return require('./pages/Home')
    }
}
