/*
 *     Copyright (C) 2020   Floffah
 *     All rights reserved
 *
 *     See GNU GPL v3 license
 *
 *     See file copyright for individual contributors information
 *
 *     @author Floffah
 *     @link https://github.com/floffah/
 */

import React from 'react';
import {Button, Col, Input, Row, Select} from "antd";
import {post} from "../../../lib/comms";
import {showError} from "../../../lib/overlay";
import {ArrowLeftOutlined} from '@ant-design/icons';
import {changePage} from "../../../ui";

export default class UserEdit extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            user: {
                username: "Loading",
                type: "Loading",
                id: "Loading",
                permissions: {
                    "Loading": true
                }
            },
            loading: false,
            disabled: true,
            changed: {
                username: false,
                permissions: false,
                type: false
            }
        }

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        if (this.props.data) {
            if (this.props.data.username) {
                post("/users/get", {
                    access_code: localStorage.getItem("access_code"),
                    username: this.props.data.username
                }).then((r) => this.ok(r.data));
            } else if (this.props.data.userid) {
                post("/users/get", {
                    access_code: localStorage.getItem("access_code"),
                    userid: this.props.data.userid
                }).then((r) => this.ok(r.data));
            }
        } else {
            changePage("/users")
        }
    }

    ok(d) {
        if (!d.error) {
            this.setState({
                user: d.user
            });
        } else {
            showError(d.error);
            changePage("/users")
        }
    }

    onChange(name, v) {
        if(this.state.user.id !== "Loading") {
            if (this.state.disabled === true) {
                this.setState({
                    disabled: false
                })
            }
            let value = v;
            if (typeof v !== "string") {
                value = v.target.value;
            }
            let oldstate = this.state.changed;
            oldstate[name] = value;
            this.setState({
                changed: oldstate
            });
        }
    }

    onSave() {
        this.setState({
            disabled: true,
            loading: true
        });
        post("/users/edit", {
            access_code: localStorage.getItem("access_code"),
            quserid: this.state.user.id,
            ...this.state.changed
        }).then(() => {
            this.setState({
                loading: false
            });
            setTimeout(() => changePage("/users"), 500)
        });
    }

    render() {
        let gridinfo = {
            row: {
                gutter: [16, 16]
            }
        }

        return (
            <div className="user-body" style={{padding: 5}}>
                <div className="user-container" style={{
                    backgroundColor: 'white',
                    padding: 5,
                    width: "100%",
                    margin: 5,
                    borderRadius: 5,
                }}>
                    <div className="user-edit">
                        <a onClick={() => changePage("/users")}><ArrowLeftOutlined/>&nbsp;&nbsp;Go back</a>
                        <div className="user-edit-details" style={{marginTop: 10, marginLeft: 20}}>
                            <Row gutter={gridinfo.row.gutter}>
                                <Col>
                                    <Input value={(() => {
                                        if(this.state.changed.username !== false) {
                                            return this.state.changed.username
                                        } else {
                                            return this.state.user.username
                                        }
                                    })()} addonBefore="Username" onChange={(e) => this.onChange("username", e)}/>
                                </Col>
                            </Row>
                            <Row gutter={gridinfo.row.gutter}>
                                <Col>
                                    <Input value={this.state.user.id} addonBefore="User ID" disabled/>
                                </Col>
                            </Row>
                            <Row gutter={gridinfo.row.gutter}>
                                <Col>
                                    <Input value={(() => {
                                        if(this.state.changed.type !== false) {
                                            return this.state.changed.type
                                        } else {
                                            return this.state.user.type
                                        }
                                    })()} addonBefore="User type" onChange={(e) => this.onChange("type", e)}/>
                                </Col>
                            </Row>
                            <Row gutter={gridinfo.row.gutter}>
                                <Col>
                                    <Select defaultValue={this.state.user.type}>
                                        <Select.Option value="admin">Administrator</Select.Option>
                                        <Select.Option value="user">User</Select.Option>
                                    </Select>
                                </Col>
                            </Row>
                        </div>
                        <Button className="btn-success" loading={this.state.loading}
                                style={{left: "10px", position: "relative"}} disabled={this.state.disabled} onClick={this.onSave}>Save</Button>
                    </div>
                </div>
            </div>
        );
    }
}
