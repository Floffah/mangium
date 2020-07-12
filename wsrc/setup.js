/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from "react";
import ReactDOM from "react-dom"
import Setup from "./component/setup/Setup";
import Markdown from './component/markdown';
import {post, get, settingSet} from './lib/comms';
import {renderToString} from 'react-dom/server';
import {showError} from './lib/overlay';

let setupM = {
    page: 0,
    el: <Setup.Setup current={0}/>,
    signature: `mangium-setup-terms-${Date.now()}`,
    settings: new Map(),
    init() {
        ReactDOM.render(this.el, document.getElementById("content"));
        $("body").addClass("dots");
        post("/terms", {
            type: 'init',
            signature: this.signature,
        }).then((response) => {
            setupM.termsmd = <Markdown content={response.data.md}/>
            $("#setup-terms").html(renderToString(setupM.termsmd));
            setupM.setOpenPage(0);
        });
    },
    accterm(y) {
        post("/terms", {
            type: 'finish',
            signature: this.signature,
            accepted: y
        }).then(() => {}).catch((err) => {
            console.error(err);
            showError('unknown');
        });
    },
    nextPage() {
        setupM.page++
        $(".setup-pages .setup-page.setup-page-show").removeClass("setup-page-show")
        $(`.setup-pages .setup-page[data-page="${setupM.page}"]`).addClass(
            "setup-page-show",
        )
    },
    lastPage() {
        setupM.page--
        $(".setup-page.setup-page-show").removeClass("setup-page-show")
        $(`.setup-page[data-page="${setupM.page}"]`).addClass(
            "setup-page-show",
        )
    },
    setOpenPage(page) {
        setupM.page = page;
        $(".setup-pages .setup-page").removeClass("setup-page-show")
        $(`.setup-pages .setup-page[data-page="${setupM.page}"]`).addClass(
            "setup-page-show",
        )
    },
    setupDone() {
        post("/settings", {
            "access-code": "setup",
            type: "set",
            settings: [
                {
                    at: "config",
                    setting: "info.using",
                    value: setupM.settings.get("using"),
                },
                {
                    at: "config",
                    setting: "database.type",
                    value: "SQLite",
                },
                {
                    at: "settings",
                    setting: "admin",
                    value: JSON.stringify(setupM.settings.get("admin"))
                }
            ]
        }).then(res => {
            get("/setupDone").then(() => {
                window.location.reload();
            });
        });
    },
};

export default setupM
