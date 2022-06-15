import React,{ Component } from "react";
import { Col,Row } from "react-bootstrap";
import Config from "../scripts/Config";
import * as Three from "three";

class RobotState extends Component{
    state = {
        ros: null,
        x:0,
        y:0,
        orientation:0,
        l_velocity:0,
        a_velocity:0,
    };

    constructor(){
        super();
        this.init_connection();
    };

    init_connection(){
        this.state.ros = new window.ROSLIB.Ros();
        //this.setState.ros = new window.ROSLIB.Ros();
        this.state.ros.on("connection",()=> {
            this.setState({connected:true});
            console.log("Conexion Establecida");
        });

        this.state.ros.on("close",()=> {
            this.setState({connected:false});
            console.log("Conexion Cerrada");
            setTimeout(()=> {
                try{
                    //this.state.ros.connect("ws://192.168.0.18:9090");
                    this.state.ros.connect("ws://"+Config.ROSBRIDGE_SERVER_IP+":"+Config.ROSBRIDGE_SERVER_PORT+"");
                } catch (error) {
                    console.log("Problema con la conexion")
                }
            },Config.TIME_RECONNECTION);
        });
        try{
            this.state.ros.connect("ws://"+Config.ROSBRIDGE_SERVER_IP+":"+Config.ROSBRIDGE_SERVER_PORT+"");
        } catch (error) {
            console.log("Problema con la conexion")
        }
    };

    componentDidMount(){
        this.getRobotState();
    };

    getRobotState(){
        //Create Pose Subscriber
        var pose_subscriber = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.POSE_TOPIC,
            messageType: "geometry_msgs/PoseWithCovarianceStamped",
        });

        //Create Pose Callback
        pose_subscriber.subscribe((message)=> {
            this.setState({ x: message.pose.pose.position.x.toFixed(3) });
            this.setState({ y: message.pose.pose.position.y.toFixed(3)});
            this.setState({ orientation: this.getOrientationFromQuaternion(message.pose.pose.orientation).toFixed(3)});
        });

        //Create Velocity Subscriber 
        var velocity_subscriber = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.ODOM_TOPIC,
            messageType: "nav_msgs/Odometry",
        });

        //Create Velocity Callback
        velocity_subscriber.subscribe((message)=> {
            this.setState({ l_velocity: message.twist.twist.linear.x.toFixed(3) });
            this.setState({ a_velocity: message.twist.twist.angular.z.toFixed(3)});
        });
    };

    getOrientationFromQuaternion(ros_orientation_quaternion){
        var q = new Three.Quaternion(
            ros_orientation_quaternion.x,
            ros_orientation_quaternion.y,
            ros_orientation_quaternion.z,
            ros_orientation_quaternion.w,
        );
        //convert to euler
        var euler = new Three.Euler().setFromQuaternion(q);
        return euler["_z"] * (180/Math.PI);
    };
     
    render(){
        return (
            <div>
                <Row>
                    <Col>
                    <h4 className="mt-4">Posicion</h4>
                    <p className="mt-0">X: {this.state.x}</p>
                    <p className="mt-0">Y: {this.state.y}</p>
                    <p className="mt-0">Phi: {this.state.orientation}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <h4 className="mt-4">Velocidad</h4>
                    <p className="mt-0">Lineal: {this.state.l_velocity}</p>
                    <p className="mt-0">Angular: {this.state.a_velocity}</p>
                    </Col>
                </Row>
            </div>
        );
    }

}
export default RobotState;