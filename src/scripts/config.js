const Config = {
    //ROSBRIDGE_SERVER_IP: "192.168.8.101",
    ROSBRIDGE_SERVER_IP: "192.168.5.20",
    ROSBRIDGE_SERVER_PORT: "9090",
    RECONNECTION_TIMER: 3000,
    CMD_VEL_TOPIC: "joystick_state",
    CMD_VEL2_TOPIC: "joystick_state2",
    ODOM_TOPIC: "/odom",
    POSE_TOPIC: "/amcl_pose",
    BUTTON_TOPIC:"/button_state",
    CMD_VEL_MSG_TYPE: "geometry_msgs/Twist",
    // ODOM_MSG_TYPE: "nav_msgs/Odometry",
    // POSE_MSG_TYPE: "geometry_msgs/PoseWithCovarianceStamped",
    BUT_PRS_MSG_TYPE: "simple_interfaces/msg/ButtonState",
    // button name
    MANUAL_MODE:"manual"




};

export default Config;