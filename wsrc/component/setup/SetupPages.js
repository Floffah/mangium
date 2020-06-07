/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */
import React from "react"
import SetupM from "../../setup"
import {Button} from 'antd'

class Agree extends React.Component {
    render() {
        return [
            <h1 key={0}>Terms</h1>,
            <div key={1} className="setup-terms" id="setup-terms">
                <p>M</p>
            </div>,
            <div key={2} className="btn-container">
                <Button className="btn-setup-disagree"  onClick={SetupM.lastPage}>
                    Disagree
                </Button>
                <Button type="primary" className="btn-setup-agree" onClick={SetupM.nextPage}>
                    Agree
                </Button>
            </div>,
        ]
    }
}

export default {
    Agree,
}
