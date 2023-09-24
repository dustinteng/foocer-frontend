const Config = {
    //ROSBRIDGE_SERVER_IP: "192.168.8.101",
    ROSBRIDGE_SERVER_IP: "localhost",
    ROSBRIDGE_SERVER_PORT: "9090",
    RECONNECTION_TIMER: 3000,
    CMD_VEL_TOPIC: "cmd_vel",
    ODOM_TOPIC: "/odom",
    POSE_TOPIC: "/amcl_pose",
    CMD_VEL_MSG_TYPE: "geometry_msgs/Twist",
    ODOM_MSG_TYPE: "nav_msgs/Odometry",
    POSE_MSG_TYPE: "geometry_msgs/PoseWithCovarianceStamped",


};

export default Config;