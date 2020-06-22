/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from 'react'
import {Button, Input} from 'antd';
import {post} from '../../../lib/comms'
import {showError} from "../../../lib/errors";
import {changePage} from "../../../ui";

export default class Login extends React.Component {
    login() {
        post("/access", {
            username: $(".login-uname input").val(),
            password: $(".login-pass input").val()
        }).then((resp) => {
            if(resp.data.error) {
                showError(resp.data.error);
            } else {
                localStorage.setItem("access_code", resp.data["access_code"]);
                changePage("/home");
            }
        })
    }

    render() {
        return [
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
                    <Button type="primary" onClick={this.login}>Login</Button>
                </div>
            </div>
        ]
    }
}
