/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from 'react'
import {Button, Input} from 'antd';

export default class Login extends React.Component {
    render() {
        return [
            <div key={0} className="topbar">
                <h2 className="brand">Mangium</h2>
            </div>,
            <div key={1} className="login-container">
                <h2>Login</h2>
                <div className="login-padder">
                    <div className="loginput">
                        <Input name="username" className="login-uname" addonBefore="Username" placeholder="Username"/>
                    </div>
                    <div className="loginput">
                        <Input.Password name="password" className="login-pass" addonBefore="Password" placeholder="Password"/>
                    </div>
                </div>
                <div className="btn-container">
                    <Button disabled>Sign up</Button>
                    <Button type="primary">Login</Button>
                </div>
            </div>
        ]
    }
}
