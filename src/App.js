import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import axios from 'axios';
import { UserListComponent } from './components/UserListComponent';
import { SidebarComponent } from './components/SidebarComponent';
import { InitPageComponent } from './components/InitPageComponent';
import { NavbarComponent } from './components/NavbarComponent';
import { Container, Row, Col } from 'reactstrap';

class App extends Component {

  static USER_NUMER = 26
  static TOP_USER_NUMER = 3

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      topUsers: [],
      info: null
    }
  }

  componentDidMount() {
    axios.get(`https://randomuser.me/api/?results=${App.USER_NUMER}`)
      .then(response => {
        console.log("Successfully fetched user!", response);
        this.setState({
          users: response.data.results,
          info: response.data.info
        });
        console.log(this.state.users);
      })
      .catch(function (error) {
        console.log("Cannot load users!", error);
      });

    axios.get(`https://randomuser.me/api/?results=${App.TOP_USER_NUMER}`)
      .then(response => {
        console.log("Successfully fetched top user!", response);
        this.setState({
          topUsers: response.data.results,
          topUsersinfo: response.data.info
        });
      })
      .catch(function (error) {
        console.log("Cannot load top users!", error);
      });
  }

  render() {
    return (
      <Fragment>
        <NavbarComponent></NavbarComponent>

        <Container>
          <Router>
            <Row>
              <Col xs="1">
                <SidebarComponent />
              </Col>
              <Col xs="11">
                <Fragment>
                  <Route exact path="/" component={() => <InitPageComponent topUsers={this.state.topUsers} />} />
                  <Route path="/users" component={()=><UserListComponent users={this.state.users}/>}/>
                </Fragment>
              </Col>
            </Row>
          </Router>
        </Container>
      </Fragment>
    );
  }
}

export default App;
