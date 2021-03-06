import React from "react";
import "./style.scss";
import mainLogo from "./PERCH (5).png";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
	return (
		<div className='form-group'>
			<input className='form-control' {...props} />
		</div>
	);
}

export function FormBtn(props) {
	return (
		<button
			{...props}
			style={{ marginLeft: 10 }}
			className='button'>
			{props.children}
		</button>
	);
}

export function Form({ searchTerm, handleInputChange, handleFormSubmit }) {
	return (
		
		<form>
			<img src={mainLogo} class="center" alt="main Logo"/>
			<div className="search-bar">
				<input className="form-control"
					id="search-title"
					type="text"
					value={searchTerm}
					name="searchTerm"
					placeholder=" What are you looking for?"
					onChange={handleInputChange}
					required
				/>
		
			</div>
			{/* <div className="pull-right"> */}
				<button
					className="button"
					onClick={handleFormSubmit}
					type="submit">
					Get Recommendations
                </button>
			{/* </div> */}
		</form>
	)
}
