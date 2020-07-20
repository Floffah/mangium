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

import React from 'react'
import {Menu, Button} from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons';

export default class M extends React.Component {
    render() {
        return [
            <div key={0} className="topbar">
                <h2 className="brand">Mangium</h2>
            </div>,
            <div className="navmenu" key={1}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[this.props.menukey]}
                >
                    <Menu.Item key={0} icon={<InfoCircleOutlined/>}>Dashboard</Menu.Item>
                </Menu>
            </div>,
            <div key={2} className="belownav-content">
                {this.props.children}
            </div>
        ]
    }
}
