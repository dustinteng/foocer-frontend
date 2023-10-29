import React, { Component } from "react";
import { Row, Col, Container, Button } from "react-bootstrap"

import Teleoperation from "./Teleoperation";
import Teleoperation2 from "./Teleoperation2";


class Joystick extends Component {
    state = {};
    render() {
        return (
            <div>
                {/* <Container> */}
                <Row>
                        <Col>
                            <Teleoperation />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Teleoperation2/>
                        </Col>
                    </Row>
                {/* </Container> */}
            </div>
        );
    }
}

export default Joystick;