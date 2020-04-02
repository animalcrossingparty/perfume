import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Aligner = styled.div`
    margin-top: 1rem;
    text-align: right;
`;

const StyledLink = styled(Link)`
    color: gray;
    &:hover {
        color: #2f2f2f;
    }
`

const AlignedLink = ({to, children}) => (
    <Aligner>
        <StyledLink to={to}>{children}</StyledLink>
    </Aligner>
);

export default AlignedLink;