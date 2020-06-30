/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from 'react';
import {Button, Descriptions, Dropdown, Menu, PageHeader} from "antd";
import {post} from "../../../lib/comms";
import {showError} from "../../../lib/overlay";
import {ArrowLeftOutlined, EllipsisOutlined} from '@ant-design/icons';
import {changePage} from "../../../ui";

export default class Users extends React.Component {
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
            }
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
        let menu = (
            <Menu>
                <Menu.Item>
                    <a>Edit</a>
                </Menu.Item>
            </Menu>
        )

        let dpd = (
            <Dropdown overlay={menu} key={0}>
                <Button>
                    <EllipsisOutlined/>
                </Button>
            </Dropdown>
        )
        return (
            <div className="user-body" style={{padding: 5}}>
                <div className="user-container" style={{
                    backgroundColor: 'white',
                    padding: 5,
                    width: "100%",
                    margin: 5,
                    borderRadius: 5,
                }}>
                    <div className="users-list">
                        <a onClick={() => changePage("/users")}><ArrowLeftOutlined/>&nbsp;&nbsp;Go back</a>
                        <PageHeader title="User info" subTitle="To edit this user, click the menu button to the right."
                                    style={{border: "1px solid #f0f0f0", padding: 10, marginTop: 10}}
                                    extra={[
                                        dpd
                                    ]}>
                            <Descriptions>
                                <Descriptions.Item label="Username">{this.state.user.username}</Descriptions.Item>
                                <Descriptions.Item label="User ID">{this.state.user.id}</Descriptions.Item>
                                <Descriptions.Item label="User Type">{this.state.user.type}</Descriptions.Item>
                            </Descriptions>
                        </PageHeader>
                    </div>
                </div>
            </div>
        );
    }
}
