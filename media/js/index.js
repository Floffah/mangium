import io from "socket.io-client"
import React from "react"
import ReactDOM from "react-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "../sass/styles.sass"
import Socket from "./socket"

const skt = io()

skt.on("data", Socket.handle)

import "./setup"
