import React,{ Component } from "react";
import {Navbar, Nav, Container} from "react-bootstrap";

class Header extends Component{
    state = {}
    render(){
        return (
            <Container>
                <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
                    <Container>
                        <Navbar.Brand href="/home">ROS-RAM ROBOT</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="home">Home</Nav.Link>
                            <Nav.Link href="about">About</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>
        );
    }

}
export default Header;