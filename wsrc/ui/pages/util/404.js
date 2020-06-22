/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from 'react'
import {Result} from 'antd';

export default class NoPermission extends React.Component {
    render() {
        return (
            <div className="page-error-body">
                <div className="page-error-container">
                    <Result
                        status="404"
                        title="404"
                        subTitle="Page not found."
                    />
                </div>
            </div>
        )
    }
}
