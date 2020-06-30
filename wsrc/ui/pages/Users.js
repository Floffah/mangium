/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from 'react';
import {Input, Table} from "antd";
import {post} from "../../lib/comms";

export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userslist: [],
            users: 0,
            rendered: 0,
        };

        this.onSearch = this.onSearch.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }

    onSearch() {

    }

    loadMore() {
        post("/users/list", {
            access_code: localStorage.getItem('access_code'),
            amount: 5,
            index: this.state.users
        }).then((res) => {
            res.data.users.forEach(user => {
                let type = user.type;
                if (type === "admin") type = "Admin";
                this.setState({
                        userslist: [
                            ...this.state.userslist,
                            {
                                key: this.state.rendered,
                                username: user.username,
                                id: user.id,
                                type: type
                            }
                        ]
                    });
                this.state.rendered++;
            });
            this.state.users += 5;
        });
    }

    componentDidMount() {
        this.loadMore()
    }

    render() {
        let columns = [
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: 'User ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: 'User type',
                dataIndex: 'type',
                key: 'type'
            },
            {
                title: 'Actions',
                dataIndex: 'actions',
                key: 'actions',
                render: (t, r) => {
                    return [
                        <a key={0}>Profile</a>,
                        <span key={1}>&nbsp;&nbsp;</span>,
                        <a key={2}>Edit</a>
                    ]
                }
            },
        ];

        return (
            <div className="users-body" style={{padding: 5}}>
                <div className="users-container" style={{
                    backgroundColor: 'white',
                    padding: 5,
                    width: "100%",
                    margin: 5,
                    borderRadius: 5,
                }}>
                    <div className="users-search">
                        <Input.Search placeholder="Type a username" onSearch={this.onSearch} style={{width: 200}}/>
                    </div>
                    <div className="users-list" style={{marginTop: 10}}>
                        <Table dataSource={this.state.userslist} columns={columns}/>
                    </div>
                    <a onClick={this.loadMore}>Load 5 more</a>
                </div>
            </div>
        );
    }
}
