import React from "react";
import useLogRender from "../../utils/useLogPath";
import logo from "./PERCH-(3).gif";
import "./style.css";


function Head() {
	useLogRender();

	return (
		<img src={logo} class="center" alt="Perch Logo"/>
		
	);
}

export default Head;
