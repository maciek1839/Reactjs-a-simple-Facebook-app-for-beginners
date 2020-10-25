import React, {Component} from 'react';
import {Alert, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Container, Row} from 'reactstrap';
import {User} from '../../types/user';
import './InitPageComponent.scss';

export type InitPageComponentProps = {
  topUsers: Array<User>,
  isErrorDuringLoading: boolean
}

export type InitPageComponentState = {
  activeIndex: number
}

export class InitPageContainer extends Component <InitPageComponentProps, InitPageComponentState> {

  constructor(props: InitPageComponentProps) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  render() {
    return (
      <Container>
        <h1 className="txt-alg-cent">Top faces</h1>
        <Row>
          {
            this.props.isErrorDuringLoading ?
              <Col>
                <Alert color="danger">
                  Error during loading top users! Please refresh the page.
                </Alert>
              </Col> : this.props.topUsers.map((user: User, index: number) => {
                const userName = `${user.name.first} ${user.name.last}`;
                return <Col sm={12 / this.props.topUsers.length} key={index}>
                  <Card className="person-card">
                    <CardImg src={user.picture.large} alt={userName} className="img-person-card"/>
                    <CardBody>
                      <CardTitle>{userName}</CardTitle>
                      <CardSubtitle><b>Email:</b> {user.email}</CardSubtitle>
                      <CardText><b>Where can you find me?</b> {user.location.city}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              })
          }
        </Row>
      </Container>
    );
  }
}
