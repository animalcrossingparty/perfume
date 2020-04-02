import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    color: #3f3f3f;
    margin-bottom: 1rem;
`;

const AuthContent = ({title, children}) => (
    <div>
        <Title>{title}</Title>
        {children}
    </div>
);

export default AuthContent;