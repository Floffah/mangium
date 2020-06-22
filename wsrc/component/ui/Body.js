/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from 'react';
import {Button, Menu} from "antd";
import {BulbOutlined, InfoCircleOutlined, SettingOutlined} from "@ant-design/icons";
import {changePage} from "../../ui";


export default class Body extends React.Component {
    switchTheme() {
        if (localStorage.getItem("dark") === "yes") {
            localStorage.setItem("dark", "no");
        } else if (localStorage.getItem("dark") === "no") {
            localStorage.setItem("dark", "yes");
        } else {
            localStorage.setItem("dark", "no");
        }
        window.location.reload();
    }

    render() {
        let navmenu;
        let belownav;
        if (this.props.doSidebar) {
            navmenu = (
                <div className="navmenu">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[this.props.menukey]}
                    >
                        <Menu.SubMenu key="admin" title="Admin">
                            <Menu.Item key="dash" icon={<InfoCircleOutlined/>} onClick={() => changePage("/admin")}>Dashboard</Menu.Item>
                            <Menu.Item key="settings" icon={<SettingOutlined/>} onClick={() => changePage("/admin/settings")}>Settings</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </div>
            )
            belownav = (
                <div className="belownav-content">
                    {this.props.children}
                </div>
            )
        } else {
            navmenu = <div className="nonav"></div>;
            belownav = (
                <div className="belownav-content fullwidth">
                    {this.props.children}
                </div>
            )
        }

        return [
            <div key={0} className="body-content">
                <div className="topbar">
                    <h2 className="brand">Mangium</h2>
                </div>
                {navmenu}
                {belownav}
            </div>,
            <Button key={1} className="theme-switch-button" onClick={this.switchTheme}><BulbOutlined/></Button>,
        ]
    }
}
