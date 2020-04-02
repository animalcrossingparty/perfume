import React from 'react';
import styled from 'styled-components';

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
    & + & {
        margin-top: 1rem;
    }
`;

const Label = styled.div`
    font-size: 1rem;
    font-weight: 600;
    color: goldenrod;
    margin-bottom: 0.25rem;
`;

const Input = styled.input`
    width: 100%;
    border: 1px solid gray;
    outline: none;
    border-radius: 0px;
    line-height: 2.5rem;
    font-size: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    ::placeholder {
        color: lightgray;
    }
`;

const LabelInput = ({label, ...rest}) => (
    <Wrapper>
        <Label>{label}</Label>
        <Input {...rest}/>
    </Wrapper>
);

export default LabelInput;