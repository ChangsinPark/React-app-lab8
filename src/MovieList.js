import React from 'react';
import styled from 'styled-components';
import StyledTitle from './Title';
import StyledMovie from './Movie';

		//	Stateless Function Components
        const MovieList = ({className, movies}) => {
            
    
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

export const StyledMovieList = styled(MovieList)`
		background-color: papayawhip;
		box-shadow: 0px 0px 5px gray;
		padding: 10px;
		`;

export default StyledMovieList;