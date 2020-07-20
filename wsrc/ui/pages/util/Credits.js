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

import React from 'react';
import pkg from '../../../../package.json'

export default class Build extends React.Component {
    render() {
        return (
            <div className="credits-body">
                <p style={{textAlign: 'center', marginTop: "50px"}}>
                    Copyright (c) Floffah 2019<br/>
                    All rights reserved<br/>
                    See GNU GPL v3 license<br/><br/>

                    See file copyright for individual contributors information
                </p>
            </div>
        )
    }
}
