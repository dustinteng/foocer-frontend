import React, { Component } from "react";
import { Row, Col, Container, Button } from "react-bootstrap"
import ButtonV1 from "./ButtonV1";

import Config from "../scripts/config";

class Menu extends Component {
    state = {};
    render() {
        return (
            <div>
                <ButtonV1 name={Config.MANUAL_MODE}/ >
            </div>
        );
    }
}

export default Menu;