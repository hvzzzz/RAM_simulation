import React,{ Component } from "react";
import Config from "../scripts/Config";

class Map extends Component{

    state ={ ros: null };

    constructor(){
        super();
        this.view_map = this.view_map.bind(this);
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
    };

    componentDidMount(){
        this.init_connection();
        this.view_map();
    };

    view_map(){
        var viewer = new window.ROS2D.Viewer({
            divID: "nav_div",
            width: 640,
            height: 480,
        });

        var navClient = new window.NAV2D.OccupancyGridClientNav({
            ros: this.state.ros,
            rootObject: viewer.scene,
            viewer: viewer,
            // Action Server Topic - Control de mov autonomo
            servername: "/move_base",
            withOrientation: true,
        });
    }


    render(){
        return (
            <div>
                <div id="nav_div">Viewer</div>
            </div>
        );
    }

}
export default Map;