import axios from 'axios';
import React, {Component} from 'react';
import {Container} from 'reactstrap';
import './App.scss';
import {User} from './types/user';
import RoutingContent from './routing/routingContent';
import {NavbarComponent} from './common/components/NavbarComponent/NavbarComponent';
import {BrowserRouter} from 'react-router-dom';
import {UsersInfo} from './types/user-info';

export type AppState = {
  users: Array<User>,
  isErrorDuringLoadingUsers: boolean,
  topUsers: Array<User>,
  isErrorDuringLoadingTopUsers: boolean,
  topUsersInfo: UsersInfo | null,
  info: UsersInfo | null
};

class App extends Component <any, AppState> {

  readonly USER_NUMBER = 25;
  readonly TOP_USER_NUMBER = 3;

  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
      isErrorDuringLoadingUsers: false,
      topUsers: [],
      isErrorDuringLoadingTopUsers: false,
      topUsersInfo: null,
      info: null
    }
  }



  componentDidMount() {
    this.fetchedUsers(this.state.users);
    this.fetchTopUsers(this.state.topUsers);
  }

  private async fetchTopUsers(currentTopUsers?: User[]) {
    if (!currentTopUsers || currentTopUsers.length === 0) {
      try {
        const response = await axios.get(`https://randomuser.me/api/?results=${this.TOP_USER_NUMBER}`);
        console.log("Successfully fetched top users!", response);
        this.setState({
          topUsers: response.data.results,
          topUsersInfo: response.data.info
        });
      } catch (error) {
        console.error("Cannot load top users!", error);
        this.setState({
          isErrorDuringLoadingTopUsers: true
        });
      }
    } else {
      console.warn('Use cached values for top users.');
    }
  }

  private async fetchedUsers(users?: User[]) {
    if (!users || users.length === 0) {
      try {
        const response = await axios.get(`https://randomuser.me/api/?results=${this.USER_NUMBER}`);
        console.log("Successfully fetched users!", response);
        this.setState({
          users: response.data.results,
          info: response.data.info
        });
      } catch (error) {
        console.error("Cannot load users!", error);
        this.setState({
          isErrorDuringLoadingUsers: true
        });
      }
    } else {
      console.warn('Use cached values for users.');
    }
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <NavbarComponent/>
          <Container>
            <RoutingContent topUsers={this.state.topUsers}
                            isErrorDuringLoadingTopUsers={this.state.isErrorDuringLoadingTopUsers}
                            isErrorDuringLoadingUsers={this.state.isErrorDuringLoadingUsers}
                            users={this.state.users}/>
          </Container>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
