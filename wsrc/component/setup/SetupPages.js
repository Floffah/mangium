/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */
import React from "react"
import SetupM from "../../setup"

import {Button, Select} from 'antd'

function isBtmSc(el) {
    return el.innerHeight() - el.scrollTop()  >= el.innerHeight()
}

class Agree extends React.Component {
    trackScrolling() {
        let el = $("#setup-terms");
        if(!isBtmSc(el)) {
            $(".btn-setup-disagree").prop('disabled', false);
            $(".btn-setup-agree").prop('disabled', false);
        } else {
            $(".btn-setup-disagree").prop('disabled', true);
            $(".btn-setup-agree").prop('disabled', true);
        }
    }

    componentDidMount() {
        $("#setup-terms").on('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        $("#setup-terms").off('scroll');
    }

    render() {
        return [
            <h1 key={0}>Terms</h1>,
            <div key={1} className="setup-terms" id="setup-terms">
                <p>Fetching...</p>
            </div>,
            <div key={2} className="btn-container">
                <Button className="btn-setup-disagree" onClick={() => {
                    SetupM.nextPage();
                    SetupM.accterm(false);
                }}>
                    Disagree
                </Button>
                <Button type="primary" className="btn-setup-agree" onClick={() => {
                    SetupM.nextPage();
                    SetupM.accterm(true);
                }}>
                    Agree
                </Button>
            </div>,
        ]
    }
}

class Info extends React.Component {
    render() {
        return [
            <h1 key={0}>Info</h1>,
            <div className="setup-info" key={1}>
                <Select defaultValue="sqlite">
                    <Select.Option value="sqlite">SQLite</Select.Option>
                    <Select.Option value="mysql" disabled>MySQL</Select.Option>
                    <Select.Option value="pgsql" disabled>PostgreSQL</Select.Option>
                </Select>
            </div>,
            <div key={2} className="btn-container">
                <Button className="btn-setup-disagree" onClick={SetupM.lastPage}>
                    Back
                </Button>
                <Button type="primary" className="btn-setup-agree" onClick={SetupM.nextPage}>
                    Next
                </Button>
            </div>,
        ]
    }
}

export default {
    Agree, Info
}
