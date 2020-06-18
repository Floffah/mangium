/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */
import React from "react"
import ReactDOM from "react-dom"

import '@fortawesome/fontawesome-free/js/all.min'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "../media/sass/styles.sass"

import pages from './ui/pages';
import {post} from "./lib/comms";
import Body from './component/ui/Body'
import {showError} from './lib/errors'

if (localStorage.getItem("dark") === "yes") {
    require('antd/dist/antd.dark.min.css')
    $("body").addClass("dark");
} else if (localStorage.getItem("dark") === "no") {
    require('antd/dist/antd.min.css')
} else {
    localStorage.setItem("dark", "no");
    require('antd/dist/antd.min.css')
}

function changePage(page) {
    let reqpage = window.location.hash.substr(1);
    if (page) {
        reqpage = page;
        window.location.href = page;
    }
    pages.default();
    if (typeof pages[reqpage] === "function") {
        ReactDOM.render(<Body>{pages[reqpage]()}</Body>, document.getElementById("content"));
    } else {
        window.location.href = "#/home"
        ReactDOM.render(<Body>{pages["/home"]()}</Body>, document.getElementById("content"));
    }
}

post('/getState', {
    currentState: 'pageload'
}).then((res) => {
    try {
        if (res.data.state === "starting") {
            changePage("/starting")
        } else if (res.data.state !== "setup") {
            changePage();
        }
    } catch(e) {
        console.error(e);
        showError("Something wen't wrong while loading the page.")
    }
});
