import React, { Component } from "react";
import { Row, Col, Container, Button } from "react-bootstrap"
import Config from "../scripts/config";


class Map extends Component {
    state = {ros: null};

    constructor(){
        super();
        this.view_map = this.view_map.bind(this);
    }
    init_connection() {
        //this ros handler allows us to subscribe to different event such as connection / disconnection etc
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros)

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

    componentDidMount(){
        this.init_connection();
    }

    view_map(){
        //map canvas
        var viewer = new window.ROS2D.Viewer({
            divID: "nav_div", // location where the map will be displayed
            width: 640,
            height: 480,

        });

        var navClient = new window.NAV2D.OccupancyGridClientNav({
            ros: this.state.ros,
            rootObject: viewer.scene, 
            viewer: viewer, // set the canvas
            serverName: "/move_base", //responsible for the map base navigation 
            withOrientation: true,
            
        });
    }
    render() {
        return (
            <div>
                <div id = "nav_div"> viewer </div>
            </div>
        );
    }
}

export default Map;