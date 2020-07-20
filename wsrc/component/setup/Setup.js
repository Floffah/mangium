/*
 *     Copyright (C) 2020   Floffah
 *     All rights reserved
 *
 *     See GNU GPL v3 license
 *
 *     See file copyright for individual contributors information
 *
 *     @author Floffah
 *     @link https://github.com/floffah/
 */

import React from "react"
import Pages from "./SetupPages"
import {Drawer, Steps, Button} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import setupM from "../../setup";

class SetupPage extends React.Component {
    render() {
        return (
            <div className="setup-page" data-page={this.props.page}>
                {this.props.children}
            </div>
        )
    }
}

class SetupPages extends React.Component {
    render() {
        return (
            <div className="setup-pages">
                <SetupPage page={0}>
                    <Pages.Start/>
                </SetupPage>
                <SetupPage page={1}>
                    <Pages.Agree/>
                </SetupPage>
                <SetupPage page={2}>
                    <Pages.Info/>
                </SetupPage>
                <SetupPage page={3}>
                    <Pages.Admin/>
                </SetupPage>
                <SetupPage page={4}>
                    <Pages.Review/>
                </SetupPage>
                <SetupPage page={5}>
                    <Pages.Done/>
                </SetupPage>
            </div>
        )
    }
}

const Setup = () => {
    const [visible, setVisible] = React.useState(false);
    const [currentStep, setCurrent] = React.useState(setupM.page);

    const drawerClose = () => {
        setVisible(false)
    }

    const drawerOpen = () => {
        setVisible(true);
        setCurrent(setupM.page)
        console.log(setupM.page);
    }

    return [
        <div key={0} className="setup-container" id="setup-container">
            <SetupPages/>
            <Button className="setup-drawer" onClick={drawerOpen}>
                <MenuOutlined/>
            </Button>
        </div>,
        <div key={1} className="setup-steps">
            <Drawer
                title="Setup steps"
                placement="left"
                closable={true}
                visible={visible}
                onClose={drawerClose}
            >
                <Steps size="small" current={currentStep} direction="vertical">
                    <Steps.Step title="Start"/>
                    <Steps.Step title="Terms & Conditions"/>
                    <Steps.Step title="Info"/>
                    <Steps.Step title="Admin Account"/>
                    <Steps.Step title="Review"/>
                </Steps>
            </Drawer>
        </div>
    ]
}

export default {
    SetupPages,
    Setup,
    SetupPage,
}
