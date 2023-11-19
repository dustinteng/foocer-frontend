import React, { useState, useEffect } from "react";
import Config from "../../scripts/config";
import { useSelector, useDispatch } from "react-redux";
import { on, off, selectRos } from "./RosSlice";

const RosConnection = () => {
  const [ros, setRos] = useState(null);
  const [connected, setConnected] = useState(false);
  const globalRosConnected = useSelector(selectRos);
  const dispatch = useDispatch();

  useEffect(() => {
    const initConnection = () => {
      const newRos = new window.ROSLIB.Ros();

      newRos.on("connection", () => {
        console.log("Connection established in RosConnection Component!");
        setConnected(true);
        dispatch(on());
      });

      newRos.on("close", () => {
        console.log("Connection is closed!");
        setConnected(false);
        dispatch(off());

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

      setRos(newRos);
    };

    initConnection();
  }, [dispatch]);

  useEffect(() => {
    console.log("Update global ROS state:", globalRosConnected);
  }, [globalRosConnected]);

  return (
    <div>
      <div>Global ROS value: {globalRosConnected}</div>
      <div>
        Local ROS connection status: {connected ? "Connected" : "Disconnected"}
      </div>
    </div>
  );
};

export default RosConnection;
