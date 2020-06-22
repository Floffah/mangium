/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from "react";
import {Col, Input, Row, Select} from "antd";

export default class Settings extends React.Component {
    render() {
        return (
            <div className="settings-container" style={{
                padding: "10px"
            }}>
                <h2>Settings</h2>
                <SettingsSection title="Database">
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
                <SettingsSection title="Server">
                    <Setting name="Name">
                        <Input value="Mangium" disabled style={{width: "200px"}}/>
                    </Setting>
                </SettingsSection>
            </div>
        )
    }
}

class Setting extends React.Component {
    render() {
        return (
            <Row gutter={16}>
                <Col span={2}><p style={{display: "inline-block", padding: "4px 0"}}>{this.props.name}</p></Col>
                <Col span={2}>{this.props.children}</Col>
            </Row>
        )
    }
}

class SettingsSection extends React.Component {
    render() {
        return (
            <div className="settings-section">
                <h3>{this.props.title}</h3>
                <div className="settings-section-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
