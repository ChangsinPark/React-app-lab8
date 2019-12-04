import React from 'react';
import styled from 'styled-components';
import StyledTitle from './Title';
import StyledMovie from './Movie';
import {Link} from 'react-router-dom';

		//	Stateless Function Component
     const MovieList = ({ className, movies }) =>{
                return (
                    <div className = {className}>
                    <StyledTitle/>
                    <ol>
                     {movies.map(movie => (
                        <StyledMovie key={movie.id} name={movie.name} color={movie.color} link={movie.link} {...movie} />
                        ))}
                    </ol>
                    <Link to="/">Back to Form</Link>
                    </div>
                    
                );
        };

export const StyledMovieList = styled(MovieList)`
		background-color: papayawhip;
		box-shadow: 0px 0px 5px gray;
		padding: 10px;
		`;

export default StyledMovieList;