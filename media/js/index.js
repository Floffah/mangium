
/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import '@fortawesome/fontawesome-free/js/all.min'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'antd/dist/antd.css'
import '../font/stylesheet.css'
import "../sass/styles.sass"

import io from "socket.io-client"
import React from "react"
import ReactDOM from "react-dom"
import Socket from "./socket"

const skt = io()

skt.on("data", Socket.handle)

import "./setup"
