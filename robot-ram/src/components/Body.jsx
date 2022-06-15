import React,{ Component } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";

class Body extends Component{
    state = {}
    render(){
        return (
            <Container>
                    <Router>
                        <Routes>
                            <Route exact path="/home"  element={<Home/>}></Route>
                            <Route exact path="/about" element={<About/>}></Route>
                        </Routes>
                    </Router>
                
            </Container>
        );
    }

}
export default Body;