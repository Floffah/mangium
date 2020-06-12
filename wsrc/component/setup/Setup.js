/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
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
                    <Pages.Agree/>
                </SetupPage>
                <SetupPage page={1}>
                    <Pages.Info/>
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
                    <Steps.Step title="Terms & Conditions"/>
                    <Steps.Step title="Names & Info"/>
                    <Steps.Step title="Database"/>
                    <Steps.Step title="User setup"/>
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
