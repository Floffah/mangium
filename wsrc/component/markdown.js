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
import marked from 'marked'

class Markdown extends React.Component {
    render() {
        return (
            <div dangerouslySetInnerHTML={{__html: marked(this.props.content)}}></div>
        )
    }
}

export default Markdown;
