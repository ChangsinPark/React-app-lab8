import React from 'react';
import styled from 'styled-components';
import{StyledHeading1, StyledHeading3} from '/src/Styled.js';

const Title = ({className})=> (
    <div className={className}>
    <StyledHeading1> Favorite Movies </StyledHeading1>
    <StyledHeading3> Changsin </StyledHeading3>
    </div>
);


export const StyledTitle = styled(Title)`
    text-align: center;
    font-family: verdana;
    padding: 10px;
    background-color: thistle;
    `;

export default StyledTitle;
