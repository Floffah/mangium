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
import {post} from './lib/comms';
import {renderToString} from 'react-dom/server';
import {showError} from './lib/errors';

let setupM = {
    page: 0,
    el: <Setup.Setup current={0}/>,
    signature: `mangium-setup-terms-${Date.now()}`,
    settings: new Map(),
    init() {
        ReactDOM.render(this.el, document.getElementById("content"));
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
        console.log('Done dee')
    },
};

post('/getState', {
    currentState: 'pageload'
}).then((resp) => {
    if (resp.data.state === 'setup') {
        setupM.init();
    }
});

export default setupM
