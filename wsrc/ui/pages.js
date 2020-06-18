/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from "react";
import Starting from "../component/ui/Starting";
import Home from './pages/Home'

export default {
    default: () => {
        $("body").removeClass("dots")
    },
    "/starting": () => {
        $("body").addClass("dots")
        return <Starting/>
    },
    "/home": () => {
        return <Home/>
    }
}
