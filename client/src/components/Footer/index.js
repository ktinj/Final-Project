import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import FooterLogo from "./PERCH (8).png";


function Footer() {
return (
    
    <footer>
    {/* <Link to="/">
        <img src={FooterLogo} height="40" alt="FooterLogo"/><br></br>
    </Link> */}
    <p className="center">
    <small>&copy; 2021, The Perch Review</small>
    </p>
    </footer>
);
}

export default Footer;