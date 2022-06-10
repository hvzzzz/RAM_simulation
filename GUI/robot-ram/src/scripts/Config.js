const Config ={
    ROSBRIDGE_SERVER_IP:"192.168.0.15",
    ROSBRIDGE_SERVER_PORT:"9090",
    TIME_RECONNECTION: 3000, //ms
    CMD_VEL_TOPIC:"/cmd_vel",
    POSE_TOPIC: "/amcl_pose",
    ODOM_TOPIC: "/odom",
    VEl_LIN_MAX: 0.5, // m/s 
    VEL_ANG_MAX: 0.5, // rad/s
};

export default Config;

//roslib.js 925
