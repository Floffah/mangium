/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from 'react';
import {Button} from "antd";
import {BulbOutlined} from "@ant-design/icons";


export default class Body extends React.Component {
    switchTheme() {
        if(localStorage.getItem("dark") === "yes") {
            localStorage.setItem("dark", "no");
        } else if(localStorage.getItem("dark") === "no") {
            localStorage.setItem("dark", "yes");
        } else {
            localStorage.setItem("dark", "no");
        }
        window.location.reload();
    }

    render() {
        return [
            <Button key={0} className="theme-switch-button" onClick={this.switchTheme}><BulbOutlined/></Button>,
            <div key={1} className="body-content">{this.props.children}</div>
        ]
    }
}
