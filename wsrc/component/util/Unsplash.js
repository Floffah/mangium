/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from 'react'
import unsplash from "unsplash-js/lib/unsplash";
import {post} from "../../lib/comms";

const Unsplash = unsplash.default;

export default class Unsplash extends React.Component {
    constructor(p) {
        super(p);
        this.elref = React.createRef();
    }

    componentDidMount() {
        let container = $(this.elref);
        post("/getkey", {
            name: "unsplash"
        }).then(res => {
            if(res.data.error === "noKeyFound") {

            } else {
                this.hasKey(res.data.key);
            }
        });
    }

    hasKey(key) {
        const splash = new Unsplash({
            accessKey: key
        });
    }

    render() {
        return (
            <div className="unsplash-container" ref={this.elref}>

            </div>
        )
    }
}
