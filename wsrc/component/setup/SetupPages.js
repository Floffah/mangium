/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */
import React from "react"
import SetupM from "../../setup"

import {Button, Input, Result, Select, Spin, Tooltip} from 'antd'

function isBtmSc(el) {
    return el.innerHeight() - el.scrollTop() >= el.innerHeight()
}

class Start extends React.Component {
    render() {
        return [
            <h1 key={0}>Start</h1>,
            <div key={1} className="setup-start setup-content-container">
                <p>Hi! You must be new to Mangium.</p>
                <p>This page will let you set up Mangium any way you want. Please follow the steps in order to complete
                    the setup.</p>
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
        if (!isBtmSc(el)) {
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
            <div key={1} className="setup-terms" id="setup-terms" onLoad={() => {
                $("#setup-terms").scrollTop();
            }}>
                <p>Fetching...</p>
            </div>,
            <div key={2} className="btn-container">
                <Button className="btn-setup-back" onClick={SetupM.lastPage}>
                    Back
                </Button>
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
    using(using) {
        if (using === "me") {
            SetupM.settings.set("using", "me")
        } else if (using === "small") {
            SetupM.settings.set("using", "small")
        } else if (using === "uncertain") {
            SetupM.settings.set("using", "uncertain")
        }
    }

    render() {
        SetupM.settings.set("using", "me")
        return [
            <h1 key={0}>Info</h1>,
            <div className="setup-info" key={1}>
                <p style={{display: "inline-block"}}>Database:&nbsp;&nbsp;&nbsp;</p>
                <Select defaultValue="sqlite">
                    <Select.Option value="sqlite">SQLite</Select.Option>
                    <Select.Option value="mysql" disabled><Tooltip placement="topLeft"
                                                                   title="Soon™">MySQL</Tooltip></Select.Option>
                    <Select.Option value="pgsql" disabled><Tooltip placement="topLeft"
                                                                   title="Soon™">PostgreSQL</Tooltip></Select.Option>
                </Select>
                <br/>
                <p style={{display: "inline-block"}}>Who's using this:&nbsp;&nbsp;&nbsp;</p>
                <Select defaultValue="me" style={{width: "109px"}} onChange={this.using}>
                    <Select.Option value="me">Just me</Select.Option>
                    <Select.Option value="small">1-5 people</Select.Option>
                    <Select.Option value="uncertain">Uncertain</Select.Option>
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


function Admin() {
    function checkNextable() {
        if ($(".setup-admin-uname span input").val().length >= 4 && $(".setup-admin-pass span input").val().length >= 5) {
            $(".btn-next-admin").prop('disabled', false);
            SetupM.settings.set("admin", {
                uname: $(".setup-admin-uname span input").val(),
                pass: $(".setup-admin-pass span input").val()
            });
        } else {
            $(".btn-next-admin").prop("disabled", true);
        }
    }

    return [
        <h1 key={0}>Admin</h1>,
        <div className="setup-admin setup-content-container" key={1}>
            <p>Make sure it's secure!</p>
            <Input style={{"marginBottom": "10px"}} addonBefore="Username" placeholder="Some Username"
                   defaultValue="Admin" className="setup-admin-uname" onChange={() => checkNextable()}/>
            <Input.Password addonBefore="Password" placeholder="Some Password" className="setup-admin-pass"
                            onChange={() => checkNextable()}/>
        </div>,
        <div key={2} className="btn-container">
            <Button className="btn-setup-back" onClick={SetupM.lastPage}>
                Back
            </Button>
            <Button type="primary" className="btn-setup-next btn-next-admin" onClick={SetupM.nextPage} onLoad={() => {
                $(".btn-next-admin").prop("disabled", true);
            }}>
                Next
            </Button>
        </div>,
    ]
}

function usingtostr(using) {
    if (using === "me") {
        return "Just me"
    } else if (using === "small") {
        return "1-5 people"
    } else if (using === "uncertain") {
        return "Uncertain"
    }
}

setInterval(() => {
    $(".setup-review-whouse").text(`Who's using this: ${usingtostr(SetupM.settings.get("using"))}`);
    $(".setup-review-uname").text(`Admin username: ${$(".setup-admin-uname span input").val()}`)
}, 1000);

function Review() {
    return [
        <h1 key={0}>Review</h1>,
        <div className="setup-review setup-content-container" key={1}>
            <p>You will be able to change these and more from the administration page.</p>
            <p>Database: SQLite</p>
            <p className="setup-review-whouse">Who's using this: </p>
            <p className="setup-review-uname">Admin username: </p>
            <p>Admin password: ••••••••••</p>
        </div>,
        <div key={2} className="btn-container">
            <Button className="btn-setup-back" onClick={SetupM.lastPage}>
                Back
            </Button>
            <Button type="primary" className="btn-setup-next btn-review-done" onClick={() => {
                SetupM.setupDone();
                SetupM.nextPage()
            }}>
                Done
            </Button>
        </div>,
    ]
}

class Done extends React.Component {
    render() {
        return [
            <div key={1} className="setup-done setup-content-container">
                <Result status="success" title="You've finished the setup!"
                        subTitle={[<span>Saving&nbsp;&nbsp;</span>, <Spin size="small"/>]}/>
            </div>,
        ]
    }
}

export default {
    Start, Agree, Info, Admin, Review, Done
}
