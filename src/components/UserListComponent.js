import React, { Component, Fragment } from 'react';
import { Card, CardBody, Col, Collapse, Input, InputGroup, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { UserDetailsComponent } from './UserDetailsComponent';


export class UserListComponent extends Component {

    constructor(props) {
        super(props);
        const users=this.mapUsersToListOfusers(props.users);
        this.state = {
            users: users,
            filteredUsers: users
        }
    }

    mapUsersToListOfusers(users) {
        return users.map(function (user, index) {
            return {
                "isCollapsed": false,
                "user": user,
                "id": index
            };
        });
    }

    prepareUserTitleForList(user) {
        return `${user.name.first} ${user.name.last}`;
    }

    toggleUser(id) {
        this.setState({
            users: this.state.users.map((elem, index) => {
                if (id === elem.id) {
                    elem.isCollapsed = !elem.isCollapsed
                }
                return elem;
            })
        });
    }

    filterUsers(inputValue){
        this.setState({
            filteredUsers: this.state.users.filter(e=>this.prepareUserTitleForList(e.user).includes(inputValue))
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
                                <Input placeholder="Search user..." onChange={($event)=>this.filterUsers($event.target.value)} />
                            </InputGroup>
                        </Row>
                    </Col>
                </div><br />
                <ListGroup>
                    {this.state.filteredUsers.map((e, key) =>
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