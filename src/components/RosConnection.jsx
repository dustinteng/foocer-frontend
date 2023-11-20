import React, { useState, useEffect } from "react";
import Config from "../scripts/config";
import { useSelector, useDispatch } from "react-redux";
import { setRos, selectRos } from "../redux/ros/RosSlice";

const RosConnection = () => {
  const ros = useSelector(selectRos);
  const [connected, setConnected] = useState(false);
  const dispatch = useDispatch();

  const newRos = new window.ROSLIB.Ros();
  // dispatch(setRos(newRos));

  useEffect(() => {
    const initConnection = () => {
      // dispatch(setRos(newRos));

      newRos.on("connection", () => {
        console.log("Connection established in RosConnection Component!");
        setConnected(true);
        // Dispatch the 'setRos' action to update 'ros' in the Redux store
        console.log("newrossss__", newRos);
      });

      newRos.on("close", () => {
        console.log("Connection is closed!");
        setConnected(false);

        // Try to reconnect every 3 seconds
        setTimeout(() => {
          try {
            newRos.connect(
              `ws://${Config.ROSBRIDGE_SERVER_IP}:${Config.ROSBRIDGE_SERVER_PORT}`
            );
          } catch (error) {
            console.log("Connection problem ");
          }
        }, Config.RECONNECTION_TIMER);
      });

      try {
        newRos.connect(
          `ws://${Config.ROSBRIDGE_SERVER_IP}:${Config.ROSBRIDGE_SERVER_PORT}`
        );
      } catch (error) {
        console.log(
          `ws://${Config.ROSBRIDGE_SERVER_IP}:${Config.ROSBRIDGE_SERVER_PORT}`
        );
        console.log("Connection problem ");
      }

      // setRosInstance(newRos);
    };

    // Initialize connection when the component mounts
    initConnection();

    // Clean up the connection when the component unmounts
    return () => {
      if (ros) {
        ros.close();
      }
    };
  }, [dispatch, ros]);

  return (
    <div>
      <div>
        Local ROS connection status: {connected ? "Connected" : "Disconnected"}
      </div>
    </div>
  );
};

export default RosConnection;
