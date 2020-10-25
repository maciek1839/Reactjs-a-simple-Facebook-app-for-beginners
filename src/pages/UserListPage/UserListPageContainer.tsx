import React, {Component} from 'react';
import {Alert, Card, CardBody, Collapse, Form, Input, InputGroup, ListGroup, ListGroupItem} from 'reactstrap';
import {User} from '../../types/user';
import {UserDetailsComponent} from './components/UserDetailsComponent/UserDetailsComponent';
import {FilteredUser} from '../../types/filtered-user';

interface UserListComponentProp {
  users: Array<User>,
  isErrorDuringLoading: boolean
}

interface UserListComponentState {
  users: Array<FilteredUser>,
  filteredUsers: Array<FilteredUser>
}

export class UserListPageContainer extends Component<UserListComponentProp, UserListComponentState> {

  constructor(props: UserListComponentProp) {
    super(props);
    const users = this.mapUsersToListOfUsers(props.users);
    this.state = {
      users: users,
      filteredUsers: users
    }
  }

  mapUsersToListOfUsers(users: Array<User>): Array<FilteredUser> {
    return users.map(function (user, index) {
      return {
        "isCollapsed": false,
        "user": user,
        "id": index
      };
    });
  }

  prepareUserTitleForList(user: User) {
    return `${user.name.first} ${user.name.last}`;
  }

  toggleUser(id: number) {
    this.setState({
      users: this.state.users.map((elem: FilteredUser, index: number) => {
        if (id === elem.id) {
          elem.isCollapsed = !elem.isCollapsed
        }
        return elem;
      })
    });
  }

  filterUsers(inputValue: string) {
    if (this.state.users && this.state.users.length > 0) {
      this.setState({
        filteredUsers: this.state.users.filter((e: FilteredUser) => this.prepareUserTitleForList(e.user).includes(inputValue))
      });
    }
  }

  renderErrorMessageIfNecessary(isErrorDuringLoading: boolean): JSX.Element | null {
    return isErrorDuringLoading ? <Alert color="danger">
      Error during loading users! Please refresh the page.
    </Alert> : null;
  }

  render() {
    return <React.Fragment>
      <h1>User list</h1>
      <Form className="element-m-spacing-v">
        <InputGroup>
          <Input placeholder="Search user..."
                 onChange={($event: React.ChangeEvent<HTMLInputElement>) =>
                   this.filterUsers($event.target.value)
                 }/>
        </InputGroup>
      </Form>
      {this.renderErrorMessageIfNecessary(this.props.isErrorDuringLoading)}
      <ListGroup>
        {this.generateUsersList()}
      </ListGroup>
    </React.Fragment>;
  }

  private generateUsersList(): JSX.Element[] {
    return this.state.filteredUsers ? this.state.filteredUsers.map((e: FilteredUser, key: number) =>
      <React.Fragment key={key}>
        <ListGroupItem className="pointer"
                       action
                       onClick={() => this.toggleUser(e.id)}>
          {this.prepareUserTitleForList(e.user)}
        </ListGroupItem>
        <Collapse isOpen={e.isCollapsed}>
          <Card>
            <CardBody>
              <UserDetailsComponent user={e.user}/>
            </CardBody>
          </Card>
        </Collapse>
      </React.Fragment>) : [<Alert color="warning">No available users</Alert>];
  }
}
