import React, { Component } from 'react';
import { AuthContent, LabelInput, AuthButton, AlignedLink } from 'components/Auth';

class Register extends Component {
    render() {
        return (
            <AuthContent title="회원가입">
                <LabelInput label="이메일 주소" name="email" placeholder="ex) perfume@liche.com"/>
                <LabelInput label="별명" name="username" placeholder="ex) 향수왕"/>
                <LabelInput label="비밀번호" name="password" placeholder="ex) 숫자 + 영문 + 특수문자 + 한자 (250자리 이상)" type="password"/>
                <LabelInput label="비밀번호 확인" name="passwordConfirm" placeholder="ex) 숫자 + 영문 + 특수문자 + 한자 (250자리 이상)" type="password"/>
                <AuthButton>회원가입</AuthButton>
                <AlignedLink to="/auth/login">로그인</AlignedLink>
            </AuthContent>
        );
    }
}

export default Register;