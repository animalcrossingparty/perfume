import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 1rem;
    padding-top: 0.6rem;
    padding-bottom: 0.5rem;
    margin-left: auto;
    
    border-radius: 15px;
    width: 30%;
    box-shadow: 2px 2px 3px lightpink;

    // background: coral;
    background: rgb(252, 211, 212);
    color: white;

    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;

    cursor: pointer;
    user-select: none;
    transition: .2s all;

    &:hover {
        // background: coral;
        background:  rgb(196, 229, 231);
        box-shadow: 2px 2px 3px lightblue;
    }

    &:active {
        background: lightblue;
        box-shadow: 2px 2px 3px rgb(166, 189, 191) inset;
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