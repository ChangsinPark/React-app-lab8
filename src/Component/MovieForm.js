import styled from 'styled-components';
import {StyledInput, StyledForm} from '/src/Styled.js';
import StyledMovieList from './MovieList';

	//block body ES6 Arrow Anonymous Function = Stateful Component with React Hooks
	const MovieForm = () => {
		const [checkboxGroup, setCheckboxGroup] = React.useState([false,false,false,false]);
		const [showForm, setShowForm] = React.useState(true);
		
		//event handler for checkboxes
		const handleCheckbox = (event) => {
			//convert the string value from the form to a number
			const index = parseInt(event.target.value, 10);
			//user slice to create a new array with updated element
			setCheckboxGroup([ ...checkboxGroup.slice(0, index), event.target.checked, ...checkboxGroup.slice(index + 1)]);
		}
		//event handler for the submit button
		const handleSubmit = (event) => {
			//stops the default behaviour of a forced page refresh on form submission that some browsers do.
			event.preventDefault();
			for( let i=0; i < checkboxGroup.length; i++){
			(async () => {
				//fetch call
			try{
				const response = await fetch(`http://192.168.33.10:3004/movies/${i}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"checked": checkboxGroup[i]
					})
				}); // closes fetch call
				    // This is for HTTP Errors, not Networking Errors
				if (!response.ok) throw Error(response.status + ': ' + response.statusText);
              		// extract the JSON from the body of the Response
              		//const result = await response.json();
				if ( i === checkboxGroup.length - 1 ) {
				setShowForm( false );
				}
			} catch(error) {
				console.log('Fetch API Error: ' + error);
			}
		})();
		}
		}

		if(showForm) {
			let enableSubmit = false;
			for (const checked of (checkboxGroup)) {
				if(checked) { 
				enableSubmit = true;
				}
			}
			return(
			<StyledForm>
				<fieldset>
					<legend>Changsin's Favorite Movies:</legend>
					<label>
						<input type='checkbox'name='checkboxGroup' onChange={handleCheckbox} value='0' checked={checkboxGroup[0]}/>
						&nbsp;The Matrix
					</label>
					<br/><br/>
					<label>
						<input type='checkbox'name='checkboxGroup' onChange={handleCheckbox} value='1' checked={checkboxGroup[1]}/>
						&nbsp;The Matrix Reloaded
					</label>
					<br/><br/>
					<label>
						<input type='checkbox'name='checkboxGroup' onChange={handleCheckbox} value='2' checked={checkboxGroup[2]}/>
						&nbsp;The Matrix Revolustions
					</label>
					<br/><br/>
					<label>
						<input type='checkbox'name='checkboxGroup' onChange={handleCheckbox} value='3' checked={checkboxGroup[3]}/>
						&nbsp;Avengers: Endgame
					</label>
					<br/><br/>
					{enableSubmit ? (
						<StyledInput type='button' value='Submit' onClick={handleSubmit} />) : (
						<StyledInput type='button' value='Submit' disabled />
						)}
				</fieldset>
			</StyledForm>
			);
		} else {
			return <StyledMovieList />
		}

    }
    
    const StyledMovieList = styled(MovieList)`
    background-color: papayawhip;
    box-shadow: 0px 0px 5px gray;
    padding: 10px;
    `;

    export default MovieForm;