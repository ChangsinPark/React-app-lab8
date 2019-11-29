import React from 'react';
import MovieForm from './MovieForm.js';
import StyledMovieList from './MovieList.js';


// const App = () => {
//   return <MovieForm />
// };

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        movies : [],
        showForm : true,
        checkboxGroup : [false,false,false,false]
    };
}
// componentDidMount() {
//   (async () => {
//     try {
//       // Make an API Request and store the Response
//       const response = await fetch('http://192.168.33.10:3004/movies');
//       // This is for HTTP Errors, not Networking Errors
//       if (!response.ok) throw Error(response.status + ': ' + response.statusText);
//       // extract the JSON from the body of the Response
//       const result = await response.json();
//       // update the state variable
//       this.setState({
//         movies: result
//       });
//     } catch(error) {
//       // This is for Networking Errors
//       console.log('Fetch API Error: ' + error);
//     }
//   })();
// }

componentDidUpdate( prevProps, prevState ) {
  if (this.state.showForm !== prevState.showForm) {
    (async () => {
      try {
        // Make an API Request and store the Response
        const response = await fetch('http://192.168.33.10:3004/movies');
        // This is for HTTP Errors, not Networking Errors
        if (!response.ok) throw Error(response.status + ': ' + response.statusText);
        // extract the JSON from the body of the Response
        const result = await response.json();
        // update the state variable
        this.setState({
          movies: result
        });
      } catch(error) {
        // This is for Networking Errors
        console.log('Fetch API Error: ' + error);
      }
    })();
  }
  }

 handleCheckbox = (event) => {
  //convert the string value from the form to a number
  const index = parseInt(event.target.value, 10);
  //user slice to create a new array with updated element
  this.setState([ ...this.state.checkboxGroup.slice(0, index), event.target.checked, ...this.state.checkboxGroup.slice(index + 1)]);
}

  handleForm = () => {
    //stops the default behaviour of a forced page refresh on form submission that some browsers do.
		for( let i=0; i < this.state.checkboxGroup.length; i++){
		(async () => {
			//fetch call
		try{
			const response = await fetch(`http://192.168.33.10:3004/movies/${i}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"checked": this.state.checkboxGroup[i]
				})
			}); // closes fetch call
				// This is for HTTP Errors, not Networking Errors
			if (!response.ok) throw Error(response.status + ': ' + response.statusText);
				  // extract the JSON from the body of the Response
				  //const result = await response.json();
			if ( i === this.state.checkboxGroup.length - 1 ) {
			this.setState({ showForm : false });
			}
		} catch(error) {
			console.log('Fetch API Error: ' + error);
		}
	})();
	}
  }

render(){
  if (this.state.showForm)
  return (<MovieForm checkboxGroup={this.state.checkboxGroup} movies={this.state.movies} 
    handleCheckboxCallback={this.handleCheckbox} handleFormCallback={this.handleForm} />);
  else 
  return (<StyledMovieList movies={this.state.movies} />);
    }
}

export default App;