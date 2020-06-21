/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from "react";
import {changePage} from "../ui";

import Starting from "../component/ui/Starting";
import Home from './pages/Home'

import NoMob from './pages/util/NoMobile';
import Login from './pages/util/Login'

import NoPermission from './pages/util/403'

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
    },
    "/nomobile": () => {
        return <NoMob/>
    },
    "/403": () => {
        return <NoPermission/>
    },
    "/login": () => {
        if(!localStorage.getItem("access_code")) {
            $("body").addClass("dots")
            return <Login/>
        } else {
            changePage("/403");
        }
    }
}
