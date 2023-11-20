import React, { Component } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";

import TeleoperationTranslation from "./TeleoperationTranslation";
import TeleoperationRotation from "./TeleoperationRotation";
// import TeleoperationTranslation from "./TeleoperationTranslation";
// import TeleoperationRotation from "./TeleoperationRotation";

class Joystick extends Component {
  state = {};
  render() {
    return (
      <div>
        {/* <Container> */}
        <Row>
          <Col>
            <TeleoperationTranslation />
          </Col>
        </Row>
        <Row>
          <Col>
            <TeleoperationRotation />
          </Col>
        </Row>
        {/* </Container> */}
      </div>
    );
  }
}

export default Joystick;
