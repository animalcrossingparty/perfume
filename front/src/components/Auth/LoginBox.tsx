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
    background-image: linear-gradient(to right, #e4afcb 0%, #b8cbb8 0%, #b8cbb8 0%, #e2c58b 30%, #c2ce9c 64%, #7edbdc 100%);;
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
    background: #ffe;
    padding: 4rem;
    height: auto;
`;

const LoginBox = ({ children }) => (
    <Positioner>
        <ShadowedBox>
            <LogoWrapper>
                <Logo to="/">Laure Richis</Logo>
            </LogoWrapper>
            <Contents>
                {children}
            </Contents>
        </ShadowedBox>
    </Positioner>
);

export default LoginBox;