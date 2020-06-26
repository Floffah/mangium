/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from 'react'
import {Line} from '@antv/g2plot';
import {Col, Row, Statistic, Tabs} from 'antd'
import {CloudServerOutlined, UserOutlined} from '@ant-design/icons'
import {changePage} from "../../ui";

export default class Dashboard extends React.Component {
    componentDidMount() {
        let memdata = [
            {hour: "0000", memory: 9},
            {hour: "0100", memory: 8},
            {hour: "0200", memory: 7.5},
            {hour: "0300", memory: 8.32},
            {hour: "0400", memory: 9},
            {hour: "0500", memory: 8},
            {hour: "0600", memory: 7.2},
            {hour: "0700", memory: 8.1},
            {hour: "0800", memory: 9.1},
            {hour: "0900", memory: 8},
            {hour: "1000", memory: 7.7},
            {hour: "1100", memory: 8.21},
        ];

        let memplot = new Line(document.getElementById("memchart"), {
            data: memdata,
            xField: 'hour',
            yField: 'memory',
            name: 'Memory usage',
            yAxis: {
                max: 10,
                min: 7
            },
        });

        memplot.render();
        console.log('test')
    }

    render() {
        return (
            <div className="home-body">
                <div className="home-header">
                    <div className="statsbox home-stats-box"
                         style={{
                             position: "absolute",
                             height: "360px",
                             width: "300px",
                             top: "20px",
                             left: "30px"
                         }}
                    >
                        <h2>Stats</h2>
                        <Row gutter={80} justify="center" align="top">
                            <Col>
                                <Statistic title="Total users" value={1} prefix={<UserOutlined/>}/>
                                <Statistic title="Total services" value={0} prefix={<CloudServerOutlined/>}/>
                            </Col>
                            <Col>
                                <Statistic title="Total admins" value={1} prefix={<UserOutlined/>}/>
                                <Statistic title="Total projects" value={3} prefix={<CloudServerOutlined/>}/>
                            </Col>
                        </Row>
                    </div>
                    <div className="home-charts-box chart-box"
                         style={{
                             position: "absolute",
                             top: "20px",
                             right: "30px",
                             width: "calc(100% - 400px)"
                         }}
                    >
                        <Tabs defaultActiveKey="0" size="small" type="card">
                            <Tabs.TabPane tab="Memory" key="0">
                                <div id="memchart" className="chart-container">
                                </div>
                                <a style={{
                                    position: "absolute",
                                    right: 20,
                                    bottom: 5
                                }} className="memory-information" onClick={() => changePage("/admin/memory")}>More information</a>
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}
