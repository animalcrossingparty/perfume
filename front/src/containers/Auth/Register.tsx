import React, { Component } from 'react';
import { AuthContent, LabelInput, AuthButton, AlignedLink, AuthError } from 'components/Auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmail, isLength, isAlphanumeric } from 'validator';
import { Map } from 'immutable'
import * as authActions from 'redux/modules/auth';

interface RegisterProps {
    AuthActions: any,
    message: string,
    form: any,
    exists: Map<{}, {}>,
    error: boolean,
}

class Register extends Component<RegisterProps> {

    setError = (message) => {
        const AuthActions = this.props.AuthActions;
        AuthActions.setError({
            form: 'register',
            message
        });
    }

    validate = {
        email: (value) => {
            if (!isEmail(value)) {
                this.setError('잘못된 이메일 형식 입니다.');
                return false;
            }
            return true;
        },
        username: (value) => {
            if (!isAlphanumeric(value) || !isLength(value, { min: 4, max: 15 })) {
                this.setError('아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.');
                return false;
            }
            return true;
        },
        password: (value) => {
            if (!isLength(value, { min: 6 })) {
                this.setError('비밀번호를 6자 이상 입력하세요.');
                return false;
            }
            this.setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
            return true;
        },
        passwordConfirm: (value) => {
            if (this.props.form.get('password') !== value) {
                this.setError('비밀번호확인이 일치하지 않습니다.');
                return false;
            }
            this.setError(null);
            return true;
        }
    }
    checkEmailExists = async (email) => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.checkEmailExists(email);
            if (this.props.exists.get('email')) {
                this.setError('이미 존재하는 이메일입니다.');
            } else {
                this.setError(null);
            }
        } catch (e) {
            console.log(e);
        }
    }

    checkUsernameExists = async (username) => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.checkUsernameExists(username);
            if (this.props.exists.get('username')) {
                this.setError('이미 존재하는 아이디입니다.');
            } else {
                this.setError(null);
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'register'
        });
        // 검증작업 진행
        const validation = this.validate[name](value);
        if (name.indexOf('password') > -1 || !validation) return; // 비밀번호 검증이거나, 검증 실패하면 여기서 마침
    
        // 이메일, 아이디 중복 확인
        const check = name === 'email' ? this.checkEmailExists : this.checkUsernameExists; // name 에 따라 이메일체크할지 아이디 체크 할지 결정
        check(value);
    }

    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('register')
    }

    render() {
        const { error } = this.props;
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
                {
                    error && <AuthError>{error}</AuthError>
                }
                <AuthButton>회원가입</AuthButton>
                <AlignedLink to="/auth/login">로그인</AlignedLink>
            </AuthContent>
        );
    }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['register', 'form']),
        error: state.auth.getIn(['register', 'error'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(Register);