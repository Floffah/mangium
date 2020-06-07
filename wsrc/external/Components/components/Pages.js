/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from 'react';

class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.visible = 1;
    }

    setVisible(pgkey) {

    }

    next() {

    }

    back() {

    }

    render() {
        return (
            <div className="fc-pages-container">
                <div className="fc-pages">
                    <div className="pages">
                        {this.children}
                    </div>
                </div>
                <div className="fc-buttons">
                    <button className="fc-button-next btn btn-success" onClick={this.next}>Next</button>
                    <button className="fc-button-back btn btn-secondary" onClick={this.back}>Back</button>
                </div>
            </div>
        );
    }
}
