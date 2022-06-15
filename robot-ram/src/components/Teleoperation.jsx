import React,{ Component } from "react";
import { Joystick } from 'react-joystick-component';
import Config from "../scripts/Config";

class Teleoperation extends Component{
    state = {ros:null };

    constructor(){
        super();
        this.init_connection();
        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleMove.bind(this);
    }

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
    }
    handleMove(event) {
        console.log("Handle Move");
        //Publisher of VeloCity Topic
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: "geometry_msgs/Twist",
        })
        //Create Twist Message
        var twist = new window.ROSLIB.Message({
            linear:{
                x:event.y*Config.VEl_LIN_MAX/75,
                y:0,
                z:0,
            },
            angular:{
                x:0,
                y:0,
                z:-event.x*Config.VEL_ANG_MAX/75,
            },
        });
        //Publish of VeloCity Topic
        cmd_vel.publish(twist);
    }
    handleStop(event) {
        console.log("Handle Stop");
        //Publisher of VeloCity Topic
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: "geometry_msgs/Twist",
        })
        //Create Twist Message
        var twist = new window.ROSLIB.Message({
            linear:{
                x:0,
                y:0,
                z:0,
            },
            angular:{
                x:0,
                y:0,
                z:0,
            },
        });
        //Publish of VeloCity Topic
        cmd_vel.publish(twist);
    }

    render(){
        return (
            <div>
                    <Joystick 
                    size={150} 
                    sticky={false} 
                    baseColor="#EEEEEE" 
                    stickColor="#BBBBBB" 
                    move={this.handleMove} 
                    stop={this.handleStop}>
                </Joystick>
            </div>
        );
    }

}
export default Teleoperation;