import axios from 'axios';
import React, {Component, Fragment} from 'react';
import {Container} from 'reactstrap';
import './App.scss';
import {User} from './types/user';
import RoutingContent from './routing/routingContent';
import {NavbarComponent} from './common/components/NavbarComponent/NavbarComponent';
import {BrowserRouter} from 'react-router-dom';

export type AppState = {
  users: Array<User>,
  topUsers: Array<User>,
  topUsersInfo: UsersInfo | null,
  info: UsersInfo | null
};

export type UsersInfo = {
  "seed": string,
  "results": number,
  "page": number,
  "version": string
}

class App extends Component <any, AppState> {

  static readonly USER_NUMER = 26;
  static readonly TOP_USER_NUMER = 3;

  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
      topUsers: [],
      topUsersInfo: null,
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
          topUsersInfo: response.data.info
        });
      })
      .catch(function (error) {
        console.log("Cannot load top users!", error);
      });
  }

  render() {
    return (
      <Fragment>
        <NavbarComponent/>
        <Container>
          <BrowserRouter>
            <RoutingContent topUsers={this.state.topUsers} users={this.state.users}/>
          </BrowserRouter>
        </Container>
      </Fragment>
    );
  }
}

export default App;
