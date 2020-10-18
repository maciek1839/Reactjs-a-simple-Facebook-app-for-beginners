import React, { Component } from 'react';
import { Card, CardImg, Col, Row } from 'reactstrap';

export class UserDetailsComponent extends Component<any, any> {

    render() {
        return (
            <Row>
                <Col>
                    <Row>Details</Row>
                    <Row>
                        <Col>{`Name: ${this.props.user.name.first} ${this.props.user.name.last}`}</Col>
                    </Row>
                    <Row>
                        <Col>{`Email: ${this.props.user.email}`}</Col>
                    </Row>
                    <Row>
                        <Col>{`City: ${this.props.user.location.city}`}</Col>
                    </Row>
                    <Row>
                        <Col>{`Post code: ${this.props.user.location.city}`}</Col>
                    </Row>
                    <Row>
                        <Col>{`State: ${this.props.user.location.state}`}</Col>
                    </Row>
                    <Row>
                        <Col>{`Street: ${this.props.user.location.street.name}`}</Col>
                    </Row>
                </Col>
                <Col>
                    <Card style={{ width: "150px", height: "150px" }}>
                        <CardImg top src={this.props.user.picture.large} alt="User image" />
                    </Card>
                </Col>
            </Row>
        );
    }
}
