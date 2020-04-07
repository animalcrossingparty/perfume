import React, { Component } from 'react';
import { AuthContent, LabelInput, AuthButton, AlignedLink } from 'components/Auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';


class Register extends Component<{ AuthActions: any, form: any }> {

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'register'
        });
    }

    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('register')
    }
    
    render() {
        const { email, username, password, passwordConfirm } = this.props.form.toJS();
        const { handleChange } = this;
        return (
            <AuthContent title="회원가입">
                <LabelInput
                    label="이메일 주소"
                    name="email"
                    placeholder="ex) perfume@liche.com"
                    value={email} onChange={handleChange} />
                <LabelInput
                    label="별명" 
                    name="username" 
                    placeholder="ex) 향수왕" 
                    value={username} 
                    onChange={handleChange} />
                <LabelInput 
                    label="비밀번호" 
                    name="password" 
                    placeholder="ex) 숫자 + 영문 + 특수문자 + 한자 (250자리 이상)" 
                    type="password" 
                    value={password} 
                    onChange={handleChange} />
                <LabelInput 
                    label="비밀번호 확인" 
                    name="passwordConfirm" 
                    placeholder="ex) 숫자 + 영문 + 특수문자 + 한자 (250자리 이상)" 
                    type="password" 
                    value={passwordConfirm} 
                    onChange={handleChange} />
                <AuthButton>회원가입</AuthButton>
                <AlignedLink to="/auth/login">로그인</AlignedLink>
            </AuthContent>
        );
    }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['register', 'form'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(Register);