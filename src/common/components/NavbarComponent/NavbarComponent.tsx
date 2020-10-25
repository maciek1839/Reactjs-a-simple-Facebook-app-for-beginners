import React, {Component} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {ApplicationRoutePrefix} from '../../../routing/routes';
import {Link} from 'react-router-dom';

export type NavbarComponentState= {
  isOpen:boolean
}

export type NavbarComponentProps= {

}

export class NavbarComponent extends Component<NavbarComponentProps,NavbarComponentState> {

  constructor(props:NavbarComponentProps) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Facebook - book of people</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to={'/'+ApplicationRoutePrefix.HOME}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to={'/'+ApplicationRoutePrefix.USER_LIST}>User list</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

