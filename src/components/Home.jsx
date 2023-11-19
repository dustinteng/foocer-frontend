import React, { Component } from "react";
import Connection from "./Connection";
import RobotState from "./RobotState";
import Teleoperation from "./Teleoperation";
import Teleoperation2 from "./Teleoperation2";

import ButtonV1 from "./ButtonV1";

import Config from "../scripts/config";
import { Counter } from "../redux/counter/Counter";
import Joystick from "./Joystick";
import RosConnection from "../redux/ros/RosConnection";

import Menu from "./Menu";

// import Map from "./Map";
import { Row, Col, Container, Button } from "react-bootstrap";
class Home extends Component {
  state = {
    manual_mode: false,
  };

  toggleManualMode = () => {
    this.setState((prevState) => ({
      manual_mode: !prevState.manual_mode,
    }));
  };

  render() {
    return (
      <div>
        <Container>
          <h1 className="text-center mt-3">Robot Control Page</h1>
          <Row>
            <Col>
              {/* <Connection /> */}
              <RosConnection />
            </Col>
          </Row>
          <Row>
            <Col>{this.state.manual_mode ? <Joystick /> : <Counter />}</Col>
          </Row>
          <Row>
            {" "}
            <Col>
              <button onClick={this.toggleManualMode}>Toggle Components</button>
            </Col>
            <Col>{/* <Map></Map> */}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
