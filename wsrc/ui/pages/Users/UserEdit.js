/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
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
            disabled: true
        }
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
            showError("notFound");
        }
    }

    ok(d) {
        if (!d.error) {
            this.setState({
                user: d.user
            });
        } else {
            showError(d.error);
        }
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
                                    <Input value={this.state.user.username} addonBefore="Username"/>
                                </Col>
                            </Row>
                            <Row gutter={gridinfo.row.gutter}>
                                <Col>
                                    <Input value={this.state.user.id} addonBefore="User ID" disabled/>
                                </Col>
                            </Row>
                            <Row gutter={gridinfo.row.gutter}>
                                <Col>
                                    <Input value={this.state.user.type} addonBefore="Username"/>
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
                                style={{left: "10px", position: "relative"}} disabled={this.state.disabled}>Save</Button>
                    </div>
                </div>
            </div>
        );
    }
}
