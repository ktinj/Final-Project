import React, { useState } from "react";
import NavLogo from "./PERCH (2).png";
import AboutLogo from "./PERCH (23).png";
import { Link } from "react-router-dom";
import "./style.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



function Nav () {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return ( 
        <>
        <nav>
            <ul className="navigation">
                <Link to="/">
                <img src={NavLogo} height="120" alt="Nav Logo"/>
                </Link>
                <li className="nav-right">
                    <Link to={"/"}>Log out</Link></li>
                <li className="nav-right">
                <Link onClick={handleShow}>About</Link></li> 
        <Modal size="lg" show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
        <Modal.Title><a><b>ABOUT</b></a></Modal.Title>
        </Modal.Header>
        <Modal.Body><p><img src={AboutLogo} height="35" alt="About Logo"/><br></br><br></br>
        <b>Perch</b> is a one stop shop for unbiased, unpaid for, and uncensored <br></br>
        recommendations from people you trust… <b>your friends!</b><br></br><br></br>
        If you like something, put it on <b>Perch.</b><br></br></p>
        </Modal.Body>
        <Modal.Footer>
        <Button class="close" onClick={handleClose}>
        <a><b>X</b></a>
        </Button>
        </Modal.Footer>
        </Modal>
                <li className="nav-right">
                    <Link to={"/uploadRec"}>Make a Recommendation</Link></li>
                <li className="nav-right">
                    <Link to={"/searchRec"}>Search for a Recommendation</Link></li>
                    
            </ul>
        </nav>
        </>
    );

}

export default Nav;