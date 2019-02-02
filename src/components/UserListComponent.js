import React, { Component, Fragment } from 'react';
import { Row,Col,ListGroup, ListGroupItem, Collapse, Button, CardBody, Card, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { UserDetailsComponent } from './UserDetailsComponent'


export class UserListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: this.mapUsersToListOfusers(props.users),
            filteredUsers:this.mapUsersToListOfusers(props.users)
        }
    }

    mapUsersToListOfusers(users) {
        return users.map(function (user) {
            return {
                "isCollapsed": false,
                "user": user
            };
        });
    }

    prepareUserTitleForList(user) {
        return `${user.name.first} ${user.name.last}`;
    }

    toggleUser(elemIndex) {
        console.log("Collapsed list element: " + elemIndex);
        this.setState({
            users: this.state.users.map((elem, index) => {
                if (elemIndex === index) {
                    elem.isCollapsed = !elem.isCollapsed
                }
                return elem;
            })
        });
    }

    filterUsers(inputValue){
        console.log(inputValue);
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
                            <ListGroupItem action onClick={() => this.toggleUser(key)}>{this.prepareUserTitleForList(e.user)}</ListGroupItem>
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