import React, { Component } from "react";
import { Row, Col, Container, Button } from "react-bootstrap"
import Config from "../scripts/config";
import * as Three from "three";

class RobotState extends Component {
    state = {
        ros: null,
        x: 0,
        y: 0,
        orientation: 0,
        linear_velocity: 0,
        angular_velocity: 0,

    };

    constructor() {
        super();
        this.init_connection();
    };

    init_connection() {
        //this ros handler allows us to subscribe to different event such as connection / disconnection etc
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros)

        this.state.ros.on("connection", () => {
            console.log("connection established!");
            // the line below will update the console but not the DOM
            //this.state.connected = true;
            // use setState to update the DOM
            this.setState({ connected: true });
        })

        this.state.ros.on("close", () => {
            console.log("connection closed!");
            this.setState({ connected: false });
            //try to reconnect 
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
    };

    componentDidMount() {
        this.getRobotState();
    }

    getRobotState() {

        //***creating a pose subscriber from amcl_pose topic***
        //pose subscriber for turtle bot inside the gazebo, we can modify this based on what ever we want it to use
        var pose_subscriber = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: "/amcl_pose",
            messageType: Config.POSE_MSG_TYPE
        });

        //create a pose callback
        pose_subscriber.subscribe((message) => {
            this.setState({ x: message.pose.pose.position.x.toFixed(2) });
            this.setState({ y: message.pose.pose.position.y.toFixed(2) });
            this.setState({ orientation: this.getOrientationFromQuaternion(message.pose.pose.orientation).toFixed(2) });
        })

        //***creating a velocity subscriber from odom topic***
        var velocity_subscriber = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.ODOM_TOPIC,
            messageType: Config.ODOM_MSG_TYPE,
        });

        //create a velocity callback
        pose_subscriber.subscribe((message) => {
            this.setState({ linear_velocity: message.twist.twist.linear.x.toFixed(2) });
            this.setState({ angular_velocity: message.twist.twist.angular.z.toFixed(2) });

        })
    }
    // making a function to convert quaternion to yaw pitch roll
    // roq -> ros_orientation_quaternion
    getOrientationFromQuaternion(roq) {
        var q = new Three.Quaternion(roq.x, roq.y, roq.z, roq.w);
        //convert the quaternion to roll, pitch, yaw
        var RPY = new Three.Euler().setFromQuaternion(q);

        return RPY["_z"] * (180 / Math.PI)
    }


    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <h4 className="mt-4">Position</h4>
                        <p className="mt-0">x: {this.state.x}</p>
                        <p className="mt-0">y: {this.state.y}</p>
                        <p className="mt-0">Orientation: {this.state.orientation}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4 className="mt-4">Velocity</h4>
                        <p className="mt-0">Lin Velocity: {this.state.linear_velocity}</p>
                        <p className="mt-0">Ang Velocity: {this.state.angular_velocity}</p>

                    </Col>
                </Row>
            </div>
        );
    }
}

export default RobotState;