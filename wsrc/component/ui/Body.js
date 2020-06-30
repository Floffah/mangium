/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React, {useState} from 'react';
import {Button, Drawer, Menu, Switch} from "antd";
import {
    BulbOutlined,
    CheckOutlined,
    CloseOutlined,
    ContainerOutlined,
    InfoCircleOutlined,
    SettingOutlined,
    ToolOutlined,
    UnorderedListOutlined,
    UserOutlined
} from "@ant-design/icons";
import {changePage, getPermissions} from "../../ui";


export default function Body(p) {
    function switchTheme() {
        if (localStorage.getItem("dark") === "yes") {
            localStorage.setItem("dark", "no");
        } else if (localStorage.getItem("dark") === "no") {
            localStorage.setItem("dark", "yes");
        } else {
            localStorage.setItem("dark", "no");
        }
        window.location.reload();
    }

    let navmenu;
    let belownav;
    if (p.doSidebar) {
        let admin = "";

        if (localStorage.getItem('access_code')) {
            if (getPermissions().administrator === true || getPermissions().override === "ALL" || getPermissions().override === "all") {
                admin = (
                    <Menu.SubMenu key="admin" title="Admin" icon={<ToolOutlined/>}>
                        <Menu.Item key="dash" icon={<InfoCircleOutlined/>}
                                   onClick={() => changePage("/admin")}>Dashboard</Menu.Item>
                        <Menu.Item key="settings" icon={<SettingOutlined/>}
                                   onClick={() => changePage("/admin/settings")}>Settings</Menu.Item>
                        <Menu.SubMenu key="docker" title="Docker" icon={<ContainerOutlined/>}>
                            <Menu.Item key="containers" icon={<UnorderedListOutlined/>}
                                       onClick={() => changePage("/docker/containers")}>Containers</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="users" title="Users" icon={<UserOutlined/>}>
                            <Menu.Item key="userslist" icon={<UserOutlined/>}
                                       onClick={() => changePage("/users")}>List</Menu.Item>
                        </Menu.SubMenu>
                    </Menu.SubMenu>
                );
            }
        }

        navmenu = (
            <div className="navmenu">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[p.menukey]}
                >
                    {admin}
                    <Menu.SubMenu key="info" title="Information" icon={<InfoCircleOutlined/>}>
                        <Menu.Item key="build" icon={<InfoCircleOutlined/>} onClick={() => changePage("/info")}>Build
                            Info</Menu.Item>
                        <Menu.Item disabled key="credits" icon={<BulbOutlined/>}
                                   onClick={() => changePage("/info/credits")}>Credits</Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </div>
        )
        belownav = (
            <div className="belownav-content">
                {p.children}
            </div>
        )
    } else {
        navmenu = <div className="nonav"></div>;
        belownav = (
            <div className="belownav-content fullwidth">
                {p.children}
            </div>
        )
    }
    const [visiblePGS, setVisiblePGS] = useState(false);
    const changeAnims = (checked) => {
        localStorage.setItem('animations', checked);
    }

    let logout = "";

    if (localStorage.getItem('access_code')) {
        logout = <Button type="primary" style={{float: 'right', top: 4, right: 5}}
                         onClick={() => {
                             localStorage.removeItem("access_code");
                             changePage("/login")
                         }}
        >Logout</Button>
    }

    return [
        <div key={0} className="body-content">
            <div className="topbar">
                <h2 className="brand" style={{
                    userSelect: "none",
                    cursor: "pointer"
                }} onClick={() => changePage("/home")}>Mangium</h2>
                {logout}
            </div>
            {navmenu}
            {belownav}
        </div>,
        <Button key={1} className="theme-switch-button" onClick={switchTheme}><BulbOutlined/></Button>,
        <Button key={2} className="pgsetup-open-button" onClick={() => {
            setVisiblePGS(true)
        }}><SettingOutlined/></Button>,
        <Drawer
            title="Web setup"
            placement="right"
            closable={true}
            onClose={() => {
                setVisiblePGS(false);
            }}
            visible={visiblePGS}
            key={3}
        >
            <p>Would you like to see better animations?</p>
            <p>This may impact performance</p>
            <Switch
                defaultChecked
                onChange={changeAnims}
                checkedChildren={<CheckOutlined/>}
                unCheckedChildren={<CloseOutlined/>}
            /><br/>
            {/* <a onClick={() => {*/}
            {/*    openOverlay(Unsplash); MAY BE ADDED BACK IN THE FUTURE FOR NOW ITS JUST BROKEN LMAO*/}
            {/*    setVisiblePGS(false);*/}
            {/*}}>Change background</a>*/}
        </Drawer>
    ]
}
