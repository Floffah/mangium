/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from 'react'
import M from '../common/Menu'
import {Line} from '@antv/g2plot';

export default class Home extends React.Component {
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
            height: 300,
            width: 400,
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
                <M menukey="0">
                    <div className="home-header">
                        <h1>Home</h1>
                        <div className="home-charts-layer1 chart-layer" id="charts-layer1">
                            <div id="memchart" className="chart-container">
                                <h2>Memory usage</h2>
                            </div>
                        </div>
                    </div>
                </M>
            </div>
        );
    }
}
