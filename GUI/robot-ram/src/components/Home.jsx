import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Connection from "./Connection";
import RobotState from "./RobotState";
import Teleoperation from "./Teleoperation";
import Map from "./Map";

class Home extends Component {
    state ={};
    render() {
        return (
            <div>
                <main>
                <Container>
                    <h1 className="text-center mt-3">Control de Robot</h1>
                    <Row>
                        <Col>
                            <Connection/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Container>
                                <Teleoperation/>
                                <RobotState></RobotState>
                            </Container>  
                        </Col>
                        <Col>
                            <h1>Mapa de Navegacion</h1>
                            <Map></Map>
                        </Col>
                    </Row>
                </Container>
                </main>
            </div>
        );
    }
}

export default Home;