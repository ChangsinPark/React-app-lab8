import React from 'react';
import MovieForm from './MovieForm.js';

// const App = () => {
//   return <MovieForm />
// };

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        movies : []
    };
}
componentDidMount() {
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
render() {
  return (
      <div className = {this.props.className}>
      <StyledTitle/>
      <ol>
       {this.state.movies.map(movie => (
          <StyledMovie key={movie.id} name={movie.name} color={movie.color} link={movie.link} {...movie} />
          ))}
      </ol>
      </div>
  );
} 
}

export default App;