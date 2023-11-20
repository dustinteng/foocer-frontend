import React, { useEffect } from "react";
import { Joystick } from "react-joystick-component";
import Config from "../scripts/config";
import { useSelector } from "react-redux";

import { selectRos, selectRosConnectionStatus } from "../redux/ros/RosSlice";

const TeleoperationRotation = () => {
  const ross = useSelector(selectRos);
  const isConnected = useSelector(selectRosConnectionStatus);
  console.log("ROS___ from Redux store:", ross);

  useEffect(() => {
    // This effect will run when the component mounts

    console.log("ROS from Redux store:", ross);

    // Add any other logic you need to run on mount
    // ...

    // Return a cleanup function if necessary
    return () => {
      // Cleanup logic
      // ...
    };
  }, [ross]); // The effect will re-run whenever the 'ros' state changes

  const handleMove = (event) => {
    console.log("handle move");

    // Create a ROS publisher on the topic cmd_vel
    const cmdVel = new window.ROSLIB.Topic({
      ros: ross,
      name: Config.CMD_VEL_ROTATION_TOPIC,
      messageType: Config.CMD_VEL_MSG_TYPE,
    });

    // Create a twist message to be published to rosbridge
    const twist = new window.ROSLIB.Message({
      linear: {
        x: 0,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: -event.x / 2,
      },
    });

    // Publish the message on the cmd_vel topic
    cmdVel.publish(twist);
  };

  const handleStop = () => {
    console.log("handle stop");

    // Create a ROS publisher on the topic cmd_vel
    const cmdVel = new window.ROSLIB.Topic({
      ros: ross,
      name: Config.CMD_VEL_ROTATION_TOPIC,
      messageType: "geometry_msgs/Twist",
    });

    // Create a twist message to be published to rosbridge
    const twist = new window.ROSLIB.Message({
      linear: {
        x: 0,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: 0,
      },
    });

    // Publish the message on the cmd_vel topic
    cmdVel.publish(twist);
  };

  return (
    <div>
      <Joystick
        size={100}
        baseColor="#EEEEEE"
        stickColor="#BBBBBB"
        move={handleMove}
        stop={handleStop}
      ></Joystick>
    </div>
  );
};

export default TeleoperationRotation;
