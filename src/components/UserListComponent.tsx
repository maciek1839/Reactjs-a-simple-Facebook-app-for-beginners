import React, { Component, Fragment } from 'react';
import { Card, CardBody, Col, Collapse, Input, InputGroup, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { UserDetailsComponent } from './UserDetailsComponent';
import { User } from '../types/user';

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

export class UserListComponent extends Component<UserListComponentProp, UserListComponentState> {

    static defaultProps = { 
        users: [] 
    }

    constructor(props:UserListComponentProp) {
        super(props);
        const users=this.mapUsersToListOfusers(props.users);
        this.state = {
            users: users,
            filteredUsers: users
        }
    }

    mapUsersToListOfusers(users:Array<User>):Array<FilteredUser> {
        return users.map(function (user, index) {
            return {
                "isCollapsed": false,
                "user": user,
                "id": index
            };
        });
    }

    prepareUserTitleForList(user:User) {
        return `${user.name.first} ${user.name.last}`;
    }

    toggleUser(id:number) {
        this.setState({
            users: this.state.users.map((elem:FilteredUser, index:number) => {
                if (id === elem.id) {
                    elem.isCollapsed = !elem.isCollapsed
                }
                return elem;
            })
        });
    }

    filterUsers(inputValue:string){
        this.setState({
            filteredUsers: this.state.users.filter((e:FilteredUser)=>this.prepareUserTitleForList(e.user).includes(inputValue))
        });
    }

    render() {
        return this.props.users.length === 0 ?
            <div>No available users :(</div> :
            <Fragment>
                <div>
                    <Col>
                        <Row>
                            <InputGroup>
                                <Input placeholder="Search user..." onChange={($event:React.ChangeEvent<HTMLInputElement>)=>this.filterUsers($event.target.value)} />
                            </InputGroup>
                        </Row>
                    </Col>
                </div><br />
                <ListGroup>
                    {this.state.filteredUsers.map((e:FilteredUser, key:number) =>
                        <Fragment key={key}>
                            <ListGroupItem className="pointer" action onClick={() => this.toggleUser(e.id)}>{this.prepareUserTitleForList(e.user)}</ListGroupItem>
                            <Collapse isOpen={e.isCollapsed} >
                                <Card>
                                    <CardBody>
                                        <UserDetailsComponent user={e.user} />
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </Fragment>)
                    }
                </ListGroup>
            </Fragment>

    }
}

UserListComponent.defaultProps = { users: [] }