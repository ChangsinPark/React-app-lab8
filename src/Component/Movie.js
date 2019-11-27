import React from 'react';
import styled from 'styled-components';

const Movie = ({name, link, className, checked})=> {
    if (checked) {
        return(
            <div className = {className}>
                <li> {name} <a href= {link}> {link} </a> </li>
            </div>
            );
    } else {
        return null;
    }
};


export const StyledMovie = styled(Movie)`
background-color: wheat;
font-weight: bold;
color: ${name => name.color};
`;

export default StyledMovie;

