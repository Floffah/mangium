/*
 *     Copyright (C) 2020   Floffah
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from "react"
import ReactDOM from "react-dom"
import Socket from "./socket"
import Setup from "./component/setup/Setup"

let setupM = {
    page: 0,
    init() {
        ReactDOM.render(<Setup.Setup/>, document.getElementById("content"))
        setupM.page = 0
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
