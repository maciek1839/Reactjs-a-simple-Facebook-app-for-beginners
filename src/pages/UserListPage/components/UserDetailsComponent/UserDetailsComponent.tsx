import React, {Component} from 'react';
import {Card, CardImg, Col, Container, Row} from 'reactstrap';
import {User} from '../../../../types/user';

interface UserDetailsComponentProps {
  user: User;
}

export class UserDetailsComponent extends Component<UserDetailsComponentProps, any> {

  render() {
    return (<article>
        <Container>
          <Row>
            <Col>
              <article>
                <h2>{this.props.user.name.first} {this.props.user.name.last}</h2>
                <p>
                  {`Email: ${this.props.user.email}`}
                </p>
                <Container>
                  <Row>
                    <Col className='element-p-spacing-none'>
                      <Row>
                        <Col><b>Details</b></Col>
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
                      <Card style={{width: "150px", height: "150px"}} className="element-m-spacing-v">
                        <CardImg top src={this.props.user.picture.large} alt="User image"/>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </article>
            </Col>
          </Row>
        </Container>
      </article>
    );
  }
}
