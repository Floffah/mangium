/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from 'react';
import ReactDOM from 'react-dom';

import {Alert} from 'antd'

let lasterrid = 0;

export function showError(type) {
    let errmsg = translateError(type);
    if (errmsg !== false) {
        lasterrid++;
        $("#overlay #alerts").append(`<div id="alert-${lasterrid}" class="mng-alert"></div>`);
        ReactDOM.render(<Alert message="Error" description={errmsg} type="error" closable={true} showIcon/>, document.getElementById(`alert-${lasterrid}`));
    }
}

export function translateError(type) {
    if (type === "incoSignature") {
        return "Something went wrong while checking the validity of your agreement. Try refreshing the page."
    } else if (type === "largeTimeDiff") {
        return "You took to long. Please try again."
    } else if (type === "sameState") {
        return false;
    } else if (type === "unknown") {
        return "An unknown server error occurred."
    } else if(type === "incoInfo") {
        return "Something went wrong. If reloading the page does not work please restart Mangium."
    } else if(type === "incoReq") {
        return "An unexpected error occurred. Please refresh the page."
    } else if(type=== "notSupported") {
        return "Sorry, that action is not supported."
    } else if(type === "notFound") {
        return "Sorry, the information provided did not match any records."
    }
    return type;
}
