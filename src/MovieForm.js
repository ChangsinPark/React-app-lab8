import React from 'react';
import styled from 'styled-components';
import StyledMovieList from './MovieList.js';
import {StyledInput, StyledForm} from './Styled.js';


//block body ES6 Arrow Anonymous Function = Stateful Component with React Hooks
const MovieForm = ({movies, checkboxGroup, handleCheckboxCallback, handleFormCallback}) => {

	//event handler for the submit button
	const handleSubmit = (event) => {
		event.preventDefault();
		handleFormCallback();
	}


		
		let enableSubmit = false;
		for (const checked of (checkboxGroup)) {
			if(checked) { 
			enableSubmit = true;
			}
		}
		return (
		<StyledForm>
			<fieldset>
				{ movies.map((movie,index) => (
				<React.Fragment key={movie.id}>
				<label>
				<input type="checkbox" name="checkboxGroup" value={index}
				checked={checkboxGroup[index]}
				onChange={handleCheckboxCallback} />
				&nbsp;{movie.name}
				</label>
				<br /><br />
				</React.Fragment>
				))}
				{enableSubmit ? (
					<StyledInput type='button' value='Submit' onClick={handleSubmit} />) : (
					<StyledInput type='button' value='Submit' disabled />
					)}
			</fieldset>
		</StyledForm>
		);
		

}



    export default MovieForm;