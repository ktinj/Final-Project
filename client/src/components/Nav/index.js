import React from "react";
import NavLogo from "./PERCH (22).png";
import { Link } from "react-router-dom";
import "./style.css";

function Nav () {

    return (
        <nav>
            <ul className="navigation">
                <Link to="/">
                <img src={NavLogo} height="120" alt="Nav Logo"/>
                </Link>
                <li className="nav-right">
                    <Link to={"/"}>Log out</Link></li>
                <li className="nav-right">
                    <Link to="./About">About</Link></li>
                <li className="nav-right">
                    <Link to={"/uploadRec"}>Give a Recommendation</Link></li>
                <li className="nav-right">
                    <Link to={"/searchRec"}>Search for a Recommendation</Link></li>
                    
            </ul>
        </nav>
    );

}

export default Nav;