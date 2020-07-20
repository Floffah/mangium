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

import React from 'react'

import {Result} from 'antd';

export default class Home extends React.Component {

    render() {
        return (
            <div className="nomob-body">
                <div className="nomob-container">
                    <Result
                        status="error"
                        title="Mangium currently does not support mobile users yet."
                    />
                </div>
            </div>
        );
    }
}
