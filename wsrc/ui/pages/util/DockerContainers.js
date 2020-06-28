/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */
import React, {useState} from 'react';
import {Tabs, PageHeader, Descriptions, Button, Tooltip, Empty} from "antd";
import {post} from "../../../lib/comms";
import {CheckCircleFilled, PauseCircleFilled} from "@ant-design/icons";

export default function DockerContainers() {
    let [allc, setAllc] = useState(<div>Press refresh.</div>);

    function refresh() {
        post("/docker/containers", {
            access_code: localStorage.getItem("access_code")
        }).then((resp) => {
            let toRender = [];
            let made = 0;
            console.log(resp.data.containers);
            resp.data.containers.forEach(container => {
                let dateC = new Date(0);
                dateC.setUTCSeconds(container.Created);

                let ports;
                if(container.Ports > 0) {
                    ports = `${container.Ports[0].Type}://${container.Ports[0].IP}:${container.Ports[0].PublicPort} (${container.Ports[0].PrivatePort})`;
                    container.Ports.forEach(port => {
                        if(container.Ports.indexOf(port) !== 0) {
                            ports += `, ${port.Type}://${port.IP}:${port.PublicPort} (${port.PrivatePort})`
                        }
                    });
                } else {
                    ports = "None";
                }

                let state = container.State;
                if(state === "running") {
                    state = <span><CheckCircleFilled className="greenclr"/>&nbsp;Running</span>
                } else if(state === "exited") {
                    state = <span><PauseCircleFilled className="orangeclr"/>&nbsp;Exited</span>
                }

                toRender.push(<PageHeader style={{outline: "1px solid #f0f0f0", borderRadius: 5}} key={made} ghost={false} title={container.Names[0]}>
                    <Descriptions>
                        <Descriptions.Item label="Created">{dateC.toUTCString()}</Descriptions.Item>
                        <Descriptions.Item label="ID"><Tooltip title={container.Id}>{container.Id.truncate(30)}</Tooltip></Descriptions.Item>
                        <Descriptions.Item label="Image">{container.Image}</Descriptions.Item>
                        <Descriptions.Item label="Access">{ports}</Descriptions.Item>
                        <Descriptions.Item label="State">{state}</Descriptions.Item>
                        <Descriptions.Item label="Status">{container.Status}</Descriptions.Item>
                    </Descriptions>
                </PageHeader>);
                made++;
            });
            if(resp.data.containers.length === 0) {
                toRender = <Empty/>
            }
            setAllc(toRender);
        });
    }

    return (
        <div className="containers-body" style={{padding: 10}}>
            <Tabs type="card" style={{backgroundColor: "white", padding: 5, borderRadius: 5}}>
                <Tabs.TabPane tab="All" key="1" style={{padding: 5}}>
                    {allc}
                </Tabs.TabPane>
            </Tabs>
            <Button onClick={() => refresh()} style={{position: "fixed", top: 55, right: 30}}>Refresh</Button>
        </div>
    )
}
