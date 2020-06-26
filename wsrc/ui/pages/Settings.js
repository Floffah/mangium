/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React, {useState} from "react";
import {Button, Col, Input, Row, Select} from "antd";
import {ExclamationCircleOutlined, ExclamationCircleFilled, LockOutlined} from '@ant-design/icons'
import {settingSet} from "../../lib/comms";

export default function Settings() {
    let [loading, setLoading] = useState(false);
    let [disabled, setDisabled] = useState(true);
    let ch = [];

    function runSave() {
        setLoading(true);
        settingSet(ch).then((resp) => {
            if(!resp.data.error) {
                setLoading(false);
                setDisabled(true);
            }
        });
    }

    function changed(e, setting) {
        if(disabled === true) {
            setDisabled(false);
        }
        ch.push({
            name: setting,
            value: e.target.value
        });
    }


    return (
        <div className="settings-container" style={{
            padding: "10px",
        }}>
            <h2>Settings</h2>
            <p style={{position: "relative", left: "10px"}}><LockOutlined className="primary-clr" key={0}/> represents settings which have a value that is not sent to any client for security reasons.</p>
            <Row gutter={38} style={{left: "10px", position: "relative"}}>
                <Col span={2} style={{height: "15px"}}><p style={{display: "inline-block", padding: "4px 0"}}>Name</p></Col>
                <Col span={200} style={{height: "15px"}}><p style={{display: "inline-block", width: "200px", padding: "4px 0"}}>Input</p></Col>
                <Col span={400} style={{height: "15px"}}><p style={{display: "inline-block", width: "400px", padding: "4px 0"}}>Message</p></Col>
                <Col span={100} style={{height: "15px"}}><p style={{display: "inline-block", width: "100px", padding: "4px 0"}}>Info</p></Col>
            </Row>


            <SettingsSection title="Database" message="Database configuration">
                <Setting name="Database" message={<SettingMessage type="info" message="Currently limited to only SQLite as no other database types will be added until after the 0.0.1 milestone"/>}>
                    <Select defaultValue="sqlite" style={{width: "200px"}}>
                        <Select.Option value="sqlite">SQLite</Select.Option>
                        <Select.Option value="pg" disabled>PostgreSQL</Select.Option>
                        <Select.Option value="mysql" disabled>MySQL</Select.Option>
                    </Select>
                </Setting>
                <Setting name="Path">
                    <Input value="{{data}}/db" disabled style={{width: "200px"}}/>
                </Setting>
            </SettingsSection>


            <SettingsSection title="Panel" message="Panel info">
                <Setting name="Name">
                    <Input value="Mangium" disabled style={{width: "200px"}}/>
                </Setting>
            </SettingsSection>


            <SettingsSection title="Access keys" message="Access keys that are required to talk to external APIs">
                <Setting name="Unsplash" message={<SettingMessage type="warn" message="Currently not needed"/>} info={[<LockOutlined className="primary-clr" key={0}/>]}>
                    <Input onChange={(e) => changed(e, "unsplash")} placeholder="Unsplash Access Key" style={{width: "200px"}}/>
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
                <Col span={400} style={{height: "15px"}}>{this.props.info}</Col>
            </Row>
        )
    }
}

class SettingMessage extends React.Component {
    render() {
        let icon;

        if(this.props.type=== "warn") {
            icon = [<ExclamationCircleOutlined key={0} className="warnicon"/>]
        } else if(this.props.type === "bigwarn") {
            icon = [<ExclamationCircleFilled key={0} className="bigwarnicon"/>]
        } else if(this.props.type === "err") {
            icon = [<ExclamationCircleFilled key={0} className="erricon"/>]
        } else {
            icon = "";
        }
        if(icon !== "") {
            icon.push(<span key={1}>&nbsp;&nbsp;</span>)
        }

        return (
            <p style={{width: "400px", textAlign: "left"}}>{icon}{this.props.message}</p>
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
