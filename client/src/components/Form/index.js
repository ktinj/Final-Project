import React from "react";
import "./form.css";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
	return (
		<div className='form-group'>
			<input className='form-control' {...props} />
		</div>
	);
}

// forwarding ref (alternatively you can also prop drill it): https://reactjs.org/docs/forwarding-refs.html)
export const ForwardRefInput = React.forwardRef((props, ref) => (
	<div className='form-group'>
		<input className='form-control' ref={ref} {...props} />
	</div>
));

export function TextArea(props) {
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
			className='btn'>
			{props.children}
		</button>
	);
}

export function Form({ searchTerm, handleInputChange, handleFormSubmit }) {
	return (
		
		<form>
			<p1>welcome to perch</p1>
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
