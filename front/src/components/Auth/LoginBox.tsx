import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 화면의 중앙에 위치시킨다
const Positioner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

// 너비, 그림자 설정
const ShadowedBox = styled.div`
    width: 650px;
    box-shadow: 15px 15px rgba(100, 100, 90, 0.5),
                30px 30px rgba(100, 100, 90, 0.3),
                45px 45px rgba(100, 100, 90, 0.2),
                60px 60px rgba(100, 100, 90, 0.1),
                75px 75px rgba(100, 100, 90, 0.05);
`;

// 로고
const LogoWrapper = styled.div`
    background: purple;
    height: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Logo = styled(Link)`
    color: white;
    font-size: 2.4rem;
    letter-spacing: 5px;
    text-decoration: none;
`;

// children 이 들어가는 곳
const Contents = styled.div`
    background: #fff;
    padding: 5rem;
    height: auto;
`;

const LoginBox = ({ children }) => (
    <Positioner>
        <ShadowedBox>
            <LogoWrapper>
                <Logo to="/">LAURE RICHIS</Logo>
            </LogoWrapper>
            <Contents>
                {children}
            </Contents>
        </ShadowedBox>
    </Positioner>
);

export default LoginBox;