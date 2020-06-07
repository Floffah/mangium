/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

import React from "react"
import Pages from "./SetupPages"

class SetupPage extends React.Component {
  render() {
    return (
      <div className="setup-page" data-page={this.props.page}>
        {this.props.children}
      </div>
    )
  }
}

class SetupPages extends React.Component {
  render() {
    return (
      <div className="setup-pages">
        <SetupPage page="0">
          <Pages.Agree />
        </SetupPage>
      </div>
    )
  }
}

class Setup extends React.Component {
  render() {
    return (
      <div className="setup-container" id="setup-container">
        <SetupPages />
      </div>
    )
  }
}

export default {
  SetupPages,
  Setup,
  SetupPage,
}
