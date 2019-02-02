import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link , NavLink} from "react-router-dom";
import { InitPageComponent } from './InitPageComponent';
import { UserListComponent } from './UserListComponent';

export class SidebarComponent extends Component {

  render() {
    return (
        <div>
          <ul>
            <li>
            <NavLink to="/" activeClassName="active">Home</NavLink>
            </li>
            <li>
            <NavLink to="/users" activeClassName="active">Users</NavLink>
            </li>
          </ul>

          <hr />
        </div>
    );
  }
}