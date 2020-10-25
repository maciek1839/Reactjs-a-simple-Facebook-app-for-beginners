import React, {Component} from 'react';
import {Card, CardBody, Collapse, Form, Input, InputGroup, ListGroup, ListGroupItem} from 'reactstrap';
import {User} from '../../types/user';
import {UserDetailsComponent} from './components/UserDetailsComponent/UserDetailsComponent';

export type UserListComponentProp = {
  users: Array<User>
}

export type UserListComponentState = {
  users: Array<FilteredUser>,
  filteredUsers: Array<FilteredUser>
}

export type FilteredUser = {
  "isCollapsed": boolean,
  "user": User,
  "id": number
}

export class UserListPageContainer extends Component<UserListComponentProp, UserListComponentState> {

  static defaultProps = {
    users: []
  }

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
    this.setState({
      filteredUsers: this.state.users.filter((e: FilteredUser) => this.prepareUserTitleForList(e.user).includes(inputValue))
    });
  }

  render() {
    return <React.Fragment>
      <h1>User list</h1>
      {
        this.props.users.length === 0 ?
          <div>No available users :(</div> :
          <React.Fragment>
            <Form className="element-m-spacing-v">
              <InputGroup>
                <Input placeholder="Search user..."
                       onChange={($event: React.ChangeEvent<HTMLInputElement>) =>
                         this.filterUsers($event.target.value)
                       }/>
              </InputGroup>
            </Form>
            <ListGroup>
              {this.generateUsersList()}
            </ListGroup>
          </React.Fragment>
      }
    </React.Fragment>;
  }

  private generateUsersList() {
    return <>
      {this.state.filteredUsers.map((e: FilteredUser, key: number) =>
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
        </React.Fragment>)
      }
    </>;
  }
}
