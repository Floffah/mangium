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
    if(errmsg !== false) {
        lasterrid++;
    }
}

export function translateError(type) {
    if(type === "incoSignature") {
        return "Something went wrong while checking the validity of yourr agreement. Try refreshing the page."
    } else if(type === "largeTimeDiff") {
        return "You took to long. Please try again."
    } else if(type === "sameState") {
        return false;
    }
    return type;
}
