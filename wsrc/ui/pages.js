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
import Settings from './pages/Settings';

import NoMob from './pages/util/NoMobile';
import Login from './pages/util/Login'

import NoPermission from './pages/util/403'
import NoPage from './pages/util/404'

export default {
    default: () => {
        $("body").removeClass("dots")
    },
    "/starting": () => {
        $("body").addClass("dots")
        return {
            el: <Starting/>,
            sidebar: false,
        }
    },
    "/home": () => {
        return {
            el: <Home/>,
            sidebar: true,
            key: "home"
        }
    },
    "/nomobile": () => {
        return {
            el: <NoMob/>,
            sidebar: false,
        }
    },
    "/403": () => {
        return {
            el: <NoPermission/>,
            sidebar: true,
        }
    },
    "/404": () => {
        return {
            el: <NoPage/>,
            sidebar: true,
        }
    },
    "/login": () => {
        if(!localStorage.getItem("access_code")) {
            $("body").addClass("dots")
            return {
                el: <Login/>,
                sidebar: false,
            }
        } else {
            return {
                el: <NoPermission/>,
                sidebar: false
            }
        }
    },
    "/admin/settings": () => {
        return {
            el: <Settings/>,
            sidebar: true,
            key: "settings"
        }
    }
}
