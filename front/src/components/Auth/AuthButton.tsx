import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 1rem;
    padding-top: 0.6rem;
    padding-bottom: 0.5rem;

    background: coral;
    color: white;

    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;

    cursor: pointer;
    user-select: none;
    transition: .2s all;

    &:hover {
        background: coral;
        box-shadow: 2px 2px 3px lightblue;
    }

    &:active {
        background: lightblue;
    }

`;

interface AuthButtonProps {
  children?: any;
  onClick?: any;
}

const AuthButton = (AuthButtonProps) => (
    <Wrapper onClick={AuthButtonProps.onClick}>
        {AuthButtonProps.children}
    </Wrapper>
);

export default AuthButton;