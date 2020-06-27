
/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */


// truncate credit Kooilnc on stackoverflow.com
String.prototype.truncate = String.prototype.truncate ||
    function ( n, useWordBoundary ){
        if (this.length <= n) { return this; }
        const subString = this.substr(0, n-1); // the original check
        return (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(" "))
            : subString) + "...";
    };

import './ui'


import React from "react"
import ReactDOM from "react-dom"

import "./setup"
