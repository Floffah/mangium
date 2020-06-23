/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React, {useState} from "react";
import {Button, Col, Input, Row, Select} from "antd";
import {ExclamationCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons'

export default function Settings() {
    let [loading, setLoading] = useState(false);
    let [disabled, setDisabled] = useState(true);

    function runSave() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setDisabled(true);
        }, 1000);
    }

    function changed(e) {
        if(disabled === true) {
            setDisabled(false);
        }
    }


    return (
        <div className="settings-container" style={{
            padding: "10px"
        }}>
            <h2>Settings</h2>
            <SettingsSection title="Database" message="Database configuration">
                <Setting name="Database">
                    <Select defaultValue="sqlite">
                        <Select.Option value="sqlite">SQLite</Select.Option>
                        <Select.Option value="pg" disabled>PostgreSQL</Select.Option>
                        <Select.Option value="mysql" disabled>MySQL</Select.Option>
                    </Select>
                </Setting>
                <Setting name="Path">
                    <Input value="{{data}}/db" disabled style={{width: "200px"}}/>
                </Setting>
            </SettingsSection>
            <SettingsSection title="Server" message="Server info">
                <Setting name="Name">
                    <Input value="Mangium" disabled style={{width: "200px"}}/>
                </Setting>
            </SettingsSection>
            <SettingsSection title="Access keys" message="Access keys that are required to talk to external APIs">
                <Setting name="Unsplash" message={<SettingMessage type="warn" message="Currently not needed"/>}>
                    <Input onChange={changed} placeholder="Unsplash Access Key" style={{width: "200px"}}/>
                </Setting>
            </SettingsSection>
            <Button className="btn-success" onClick={runSave} loading={loading}
                    style={{left: "10px", position: "relative"}} disabled={disabled}>Save</Button>
        </div>
    )
}

class Setting extends React.Component {
    render() {
        return (
            <Row gutter={38}>
                <Col span={2}><p style={{display: "inline-block", padding: "4px 0"}}>{this.props.name}</p></Col>
                <Col span={200}>{this.props.children}</Col>
                <Col span={400}>{this.props.message}</Col>
            </Row>
        )
    }
}

class SettingMessage extends React.Component {
    render() {
        let icon;

        if(this.props.type=== "warn") {
            icon = <ExclamationCircleOutlined className="warnicon"/>
        } else if(this.props.type === "bigwarn") {
            icon = <ExclamationCircleFilled className="bigwarnicon"/>
        } else if(this.props.type === "err") {
            icon = <ExclamationCircleFilled className="erricon"/>
        } else {
            icon = "";
        }

        return (
            <p>{icon}&nbsp;&nbsp;<span>{this.props.message}</span></p>
        )
    }
}

class SettingsSection extends React.Component {
    render() {
        return (
            <div className="settings-section">
                <h3>{this.props.title}</h3>
                <p>{this.props.message}</p>
                <div className="settings-section-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
