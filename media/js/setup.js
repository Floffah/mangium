/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from "react";
import ReactDOM from "react-dom"
import Socket from "./socket"
import Setup from "./component/setup/Setup";
import Markdown from './component/markdown';
import terms from '../markdown/terms.md';

let setupM = {
    page: 0,
    init() {
        ReactDOM.render(<Setup.Setup/>, document.getElementById("content"));
        setupM.page = 0;
        $(".setup-terms").html(terms);
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
}

export default setupM

Socket.registerHandler("setup", (data) => {
    setupM.init()
})
