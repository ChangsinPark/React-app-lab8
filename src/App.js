import React from 'react';
// import styled from 'styled-components';
import MovieForm from './MovieForm.js';
import StyledMovieList from './MovieList.js';
import{
  BrowserRouter as Router,
  Switch,
  Route
  } from 'react-router-dom';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        movies : [],
        showForm : true,
        checkboxGroup : [false,false,false,false]
    };
}
componentDidMount() {
  (async () => {
    try {
      // Make an API Request and store the Response
      const response = await fetch('http://192.168.127.1:3004/movies');
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

componentDidUpdate( prevProps, prevState ) {
  if (this.state.showForm !== prevState.showForm) {
    (async () => {
      try {
        // Make an API Request and store the Response
        const response = await fetch('http://192.168.127.1:3004/movies');
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

 handleCheckbox =  (event) => {
  //convert the string value from the form to a number
  const index = parseInt(event.target.value, 10);
  //user slice to create a new array with updated element
  this.setState({
    checkboxGroup: [ ...this.state.checkboxGroup.slice(0, index),
     event.target.checked, ...this.state.checkboxGroup.slice(index + 1)]
    });
}

  handleForm = () => {
    //stops the default behaviour of a forced page refresh on form submission that some browsers do.
		for( let i=0; i < this.state.checkboxGroup.length; i++){
		(async () => {
			//fetch call
		try{
			const response = await fetch(`http://192.168.127.1:3004/movies/${i}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"checked": this.state.checkboxGroup[i]
				})
      }); // closes fetch call 
      // //checkbox handling
      // let enableSubmit = false;
      // for (const checked of (this.state.checkboxGroup)) {
			// 	if(checked) { 
			// 	enableSubmit = true;
			// 	}
			// }
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
  // if (this.state.showForm)
  // return (<MovieForm checkboxGroup={this.state.checkboxGroup} movies={this.state.movies} 
  //   handleCheckboxCallback={this.handleCheckbox} handleFormCallback={this.handleForm} />);
  // else 
  // return (<StyledMovieList movies={this.state.movies} />);
  //   }
  return (
    <Router>
      <Switch>
        <Route
          exact path="/"
          render={ () => {
          // if(this.state.showForm !== true) 
          //   this.setState({showForm : true});
          return (
            <MovieForm
            checkboxGroup={this.state.checkboxGroup}
            movies={this.state.movies}
            handleCheckboxCallback={this.handleCheckbox}
            handleFormCallback={this.handleForm}
            />
          );
        }}
    />
    <Route path="/results">
       <StyledMovieList movies={this.state.movies} />
    </Route>
  </Switch>
 </Router>
);
}

}

export default App;