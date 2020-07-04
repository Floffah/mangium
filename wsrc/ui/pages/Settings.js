/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React, {useState} from "react";
import {Button, Col, Input, message, Row, Select} from "antd";
import {CheckOutlined, ExclamationCircleFilled, ExclamationCircleOutlined, LockOutlined} from '@ant-design/icons'
import {settingSet} from "../../lib/comms";
import {showError} from "../../lib/overlay";

let whatchanged = {};
let changedto = {};

export default function Settings() {
    let [loading, setLoading] = useState(false);
    let [disabled, setDisabled] = useState(true);

    function changed(e, setting) {
        if (disabled === true) {
            setDisabled(false);
        }
        if (typeof e === "object") {
            whatchanged[setting] = true;
            changedto[setting] = e.target.value;
        } else {
            whatchanged[setting] = true;
            changedto[setting] = e;
        }
    }

    function runSave() {
        let ch = [];
        Object.keys(whatchanged).forEach((k) => {
            ch.push({
                name: k,
                value: changedto[k]
            });
        });
        console.log(ch);
        setLoading(true);
        settingSet(ch).then((resp) => {
            console.log(resp);
            setLoading(false);
            setDisabled(true);
            message.open({
                content: "Saved",
                icon: <CheckOutlined className="greenclr"/>
            });
            if (resp.data.error) {
                showError(resp.data.error);
            }
        });
    }

    return (
        <div className="settings-container" style={{
            padding: "10px",
        }}>
            <h2>Settings</h2>
            <Button className="btn-success" onClick={() => runSave()} loading={loading}
                    style={{left: "10px", position: "relative", marginBottom: 10}} disabled={disabled}>Save</Button>
            <p style={{position: "relative", left: "10px"}}><LockOutlined className="primary-clr" key={0}/> represents
                settings which have a value that is not sent to any client for security reasons.</p>
            <Row gutter={38} style={{left: "10px", position: "relative"}}>
                <Col span={2} style={{height: "15px"}}><p style={{display: "inline-block", padding: "4px 0"}}>Name</p>
                </Col>
                <Col span={200} style={{height: "15px"}}><p
                    style={{display: "inline-block", width: "200px", padding: "4px 0"}}>Input</p></Col>
                <Col span={400} style={{height: "15px"}}><p
                    style={{display: "inline-block", width: "400px", padding: "4px 0"}}>Message</p></Col>
                <Col span={100} style={{height: "15px"}}><p
                    style={{display: "inline-block", width: "100px", padding: "4px 0"}}>Info</p></Col>
            </Row>


            <SettingsSection title="Database" message="Database configuration">
                <Setting name="Database" message={<SettingMessage type="info"
                                                                  message="Currently limited to only SQLite as no other database types will be added until after the 0.0.1 milestone"/>}>
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


            <SettingsSection title="Server Details">
                <Setting name="Memory save interval">
                    <Select defaultValue="10" onChange={(v) => changed(v, "memint")}>
                        <Select.Option value="1">1 minute</Select.Option>
                        <Select.Option value="5">5 minutes</Select.Option>
                        <Select.Option value="10">10 minutes</Select.Option>
                        <Select.Option value="30">30 minutes</Select.Option>
                    </Select>
                </Setting>
            </SettingsSection>


            <SettingsSection title="Access keys" message="Access keys that are required to talk to external APIs">
                <Setting name="Unsplash" message={<SettingMessage type="warn" message="Currently not needed"/>}
                         info={[<LockOutlined className="primary-clr" key={0}/>]}>
                    <Input onChange={(e) => changed(e, "unsplash")} placeholder="Unsplash Access Key"
                           style={{width: "200px"}}/>
                </Setting>
            </SettingsSection>


            <Button className="btn-success" onClick={() => runSave()} loading={loading}
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

        if (this.props.type === "warn") {
            icon = [<ExclamationCircleOutlined key={0} className="warnicon"/>]
        } else if (this.props.type === "bigwarn") {
            icon = [<ExclamationCircleFilled key={0} className="bigwarnicon"/>]
        } else if (this.props.type === "err") {
            icon = [<ExclamationCircleFilled key={0} className="erricon"/>]
        } else {
            icon = "";
        }
        if (icon !== "") {
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
