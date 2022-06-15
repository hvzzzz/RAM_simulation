import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import Config from "../scripts/Config";

class Connection extends Component {
    state ={ connected: true, ros: null };

    constructor(){
        super();
        this.init_connection();
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

    render() {
        return (
            <div>
                <Alert className="text-center m-3" variant={this.state.connected? "success" : "danger"}>
                    {this.state.connected? "Robot Conectado" : "Robot Desconectado"}</Alert>
            </div>
        );
    }
}

export default Connection;