import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Container, Row } from 'reactstrap';

export class InitPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  render() {
    return (
      <Container>
        <h1 className="center maring-bottom">Top faces</h1>
        <Row>
          {
            this.props.topUsers.map((user, index) => {
              const userName = `${user.name.first} ${user.name.last}`;
              return <Col sm={12 / this.props.topUsers.length} key={index}><Card >
                <CardImg top src={user.picture.large} alt={userName} />
                <CardBody>
                  <CardTitle>{userName}</CardTitle>
                  <CardSubtitle>{user.email}</CardSubtitle>
                  <CardText>Where you can find me? {user.location.city}</CardText>
                </CardBody>
              </Card></Col>
            })
          }
        </Row>
      </Container>
    );
  }
}

InitPageComponent.defaultProps = { topUsers: [] }