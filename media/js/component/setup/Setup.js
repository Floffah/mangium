/*
 *     Copyright (C) 2020   Floffah
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
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
}
