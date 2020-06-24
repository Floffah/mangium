/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from "react";
import {changePage} from "../ui";

import Starting from "../component/ui/Starting";
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings';

import NoMob from './pages/util/NoMobile';
import Login from './pages/util/Login'

import NoPermission from './pages/util/403'
import NoPage from './pages/util/404'

import Build from './pages/util/Build'

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
    "/admin": () => {
        return {
            el: <Dashboard/>,
            sidebar: true,
            key: "dash"
        }
    },
    "/admin/settings": () => {
        return {
            el: <Settings/>,
            sidebar: true,
            key: "settings"
        }
    },
    "/info": () => {
        return {
            el: <Build/>,
            sidebar: true,
            key: "build"
        }
    }
}
