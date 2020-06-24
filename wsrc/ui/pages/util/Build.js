/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from 'react';
import pkg from '../../../../package.json'

export default class Build extends React.Component {
    render() {
        return (
            <div className="build-info-body">
                <p style={{textAlign: 'center', marginTop: "50px"}}>
                    Version: {pkg.version}<br/>
                    Author: {pkg.author}<br/>
                    License: <a href="https://github.com/Mangium/mangium/blob/master/LICENSE" target="_blank">{pkg.license}</a>
                    <br/><br/>
                    Dependencies:<br/><Dependencies deps={pkg.dependencies}/><br/><br/>
                    Dev Dependencies:<br/><Dependencies deps={pkg.devDependencies}/>
                </p>
            </div>
        )
    }
}

class Dependencies extends React.Component {
    render() {
        let depLinks = [];
        let links = 0;

        Object.keys(this.props.deps).forEach((dep) => {
            let link = `https://www.npmjs.com/package/${dep}`;
            depLinks.push(<span key={links}><a href={link} target="_blank">{dep}</a> {this.props.deps[dep]}<br/></span>);
            links++;
        });

        return (
            <span style={{width: "50%"}}>{depLinks}</span>
        );
    }
}
