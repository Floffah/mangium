/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from 'react'
import {Menu, Button} from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons';

export default class M extends React.Component {
    render() {
        return (
            <div className="navmenu">
                <Menu
                    mode="inline"
                >
                    <Menu.Item key={0} icon={<InfoCircleOutlined/>}>Dashboard</Menu.Item>
                </Menu>
            </div>
        )
    }
}
