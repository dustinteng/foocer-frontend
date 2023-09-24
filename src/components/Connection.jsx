import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import Config from "../scripts/config";

class Connection extends Component {
    state = {connected: false, ros: null};

    constructor(){
        super();
        this.init_connection();
    }

    init_connection() {
        //this ros handler allows us to subscribe to different event such as connection / disconnection etc
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros)
    
        this.state.ros.on("connection", () => {
            console.log("connection established!");
            // the line below will update the console but not the DOM
            //this.state.connected = true;
            // use setState to update the DOM
            this.setState({connected: true});
        })

        this.state.ros.on("close", () => {
            console.log("connection closed!");
            this.setState({connected: false});
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
          }
    render() {
        return (
            <Alert className="text-center mt-3"
            variant={this.state.connected? "success": "danger"}>

                <h2>Status: {this.state.connected? "Connected" : "Disconnected"}</h2>

            </Alert>

        );
    }
}

export default Connection;