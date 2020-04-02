import React, { Component } from 'react';
import { AuthContent, LabelInput, AuthButton, AlignedLink } from 'components/Auth';


class Login extends Component {
    render() {
        return (
            <AuthContent title="로그인">
                <LabelInput label="이메일" name="email" placeholder="perfume@liche.com"/>
                <LabelInput label="비밀번호" name="password" placeholder="*********" type="password"/>
                <AuthButton>로그인</AuthButton>
                <AlignedLink to="/auth/register">회원가입</AlignedLink>
            </AuthContent>
        );
    }
}

export default Login;