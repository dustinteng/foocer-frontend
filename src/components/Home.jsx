import React, { Component } from "react";
import Connection from "./Connection";
import RobotState from "./RobotState";
import Teleoperation from "./Teleoperation";
import Teleoperation2 from "./Teleoperation2";

import ButtonV1 from "./ButtonV1";

import Config from "../scripts/config";

// import Map from "./Map";
import { Row, Col, Container, Button } from "react-bootstrap";
class Home extends Component {
    state = {
    };



    render() {
        return (
            <div>
                <Container>
                    <h1 className="text-center mt-3">Robot Control Page</h1>
                    <Row>
                        <Col>
                            <Connection />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Teleoperation />
                            <Teleoperation2/>
                        </Col>
                    </Row>
                    <Row>
                        {" "}
                        <Col >
                            {/* <RobotState /> */}
                            <ButtonV1 name={Config.MANUAL_MODE}/>
                            <ButtonV1 name={"berbeda"}/>
                        </Col>
                        <Col>
                            {/* <Map></Map> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Home;
