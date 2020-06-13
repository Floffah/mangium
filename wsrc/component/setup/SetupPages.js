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

class Start extends React.Component {
    render() {
        return [
            <h1 key={0}>Start</h1>,
            <div key={1} className="setup-start setup-content-container">
                <p>Hi! You must be new to Mangium.</p>
                <p>This page will let you set up Mangium any way you want. Please follow the steps in order to complete the setup.</p>
                <p>You can see where you are at any given time by clicking the menu button.</p>
            </div>,
            <div key={2} className="btn-container">
                <Button className="btn-setup-back" disabled>
                    Back
                </Button>
                <Button type="primary" className="btn-setup-next" onClick={() => {
                    SetupM.nextPage();
                }}>
                    Next
                </Button>
            </div>,
        ]
    }
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
                <Button className="btn-setup-back" onLoad={this.trackScrolling} onClick={SetupM.lastPage}>
                    Back
                </Button>
                <Button className="btn-setup-disagree" onLoad={this.trackScrolling} onClick={() => {
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
                <Button className="btn-setup-back" onClick={SetupM.lastPage}>
                    Back
                </Button>
                <Button type="primary" className="btn-setup-next" onClick={SetupM.nextPage}>
                    Next
                </Button>
            </div>,
        ]
    }
}

export default {
    Start, Agree, Info
}
