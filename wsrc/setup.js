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
import {post, get} from './lib/comms';

let setupM = {
    page: 0,
    el: <Setup.Setup current={0}/>,
    signature: `mangium-setup-terms-${Date.now()}`,
    init() {
        ReactDOM.render(this.el, document.getElementById("content"));
        setupM.page = 0;
        post("/terms", {
            type: 'init',
            signature: this.signature,
        }).then((response) => {
            ReactDOM.render(<Markdown content={response.data.md}/>, document.getElementById("setup-terms"));
        });
    },
    nextPage() {
        if ($(`.setup-pages .setup-page[data-page="${setupM.page + 1}"]`).length) {
            $(".setup-pages .setup-page").removeClass("setup-page-show")
            $(`.setup-pages .setup-page[data-page="${setupM.page}"]`).addClass(
                "setup-page-show",
            )
            setupM.page++
        } else {
            setupM.setupDone()
        }
    },
    lastPage() {
        if ($(`.setup-pages .setup-page[data-page="${setupM.page - 1}"]`).length) {
            $(".setup-pages .setup-page").removeClass("setup-page-show")
            $(`.setup-pages .setup-page[data-page="${setupM.page}"]`).addClass(
                "setup-page-show",
            )
            setupM.page--
        }
    },
    setupDone() {
        console.log('Done dee')
    },
};

post('/getState', {
    currentState: 'pageload'
}).then((resp) => {
    if(resp.data.state === 'setup') {
        setupM.init();
    }
});

export default setupM
