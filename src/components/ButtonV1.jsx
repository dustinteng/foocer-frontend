import React, { Component } from "react";
import { Row, Col, Container, Button } from "react-bootstrap"
// import Button from 'react-bootstrap/Button';
import Config from "../scripts/config";

class ButtonV1 extends Component {
    state = {
        name: "empty",
        level: 1,
        ros: null
    };
    constructor(props) {
        super(props);
        this.init_connection();
        this.state.name = props.name
    }

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", () => {
            console.log("connection established in Teleoperation Component!");
            console.log(this.state.ros);
            this.setState({ connected: true });
        });

        this.state.ros.on("close", () => {
            console.log("connection is closed!");
            this.setState({ connected: false });
            //try to reconnect every 3 seconds
            setTimeout(() => {
                try {
                    this.state.ros.connect(
                        "ws://" +
                        Config.ROSBRIDGE_SERVER_IP +
                        ":" +
                        Config.ROSBRIDGE_SERVER_PORT +
                        ""
                    );
                } catch (error) {
                    console.log("connection problem ");
                }
            }, Config.RECONNECTION_TIMER);
        });

        try {
            this.state.ros.connect(
                "ws://" +
                Config.ROSBRIDGE_SERVER_IP +
                ":" +
                Config.ROSBRIDGE_SERVER_PORT +
                ""
            );
        } catch (error) {
            console.log(
                "ws://" +
                Config.ROSBRIDGE_SERVER_IP +
                ":" +
                Config.ROSBRIDGE_SERVER_PORT +
                ""
            );
            console.log("connection problem ");
        }
    }

    handleClick = (event) => {
        var button_state = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: "button_state",
            messageType: Config.BUT_PRS_MSG_TYPE,
        });
        var but_state = new window.ROSLIB.Message({
            name: this.state.name,
            level: 1
        });
        
        button_state.publish(but_state);
        console.log(this.state.name);

    };

    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleClick}>
                    {this.state.name}
                </Button>
            </div>
        );
    }
}

export default ButtonV1;