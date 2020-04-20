import React, { Component } from 'react';
import { AuthContent, LabelInput, AuthButton, AlignedLink, AuthError } from 'components/Auth';
import { connect } from 'react-redux';
import jwt from 'jwt-decode'
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';
import * as userActions from 'redux/modules/user';
import queryString from 'query-string';
import storage from 'lib/storage';

interface LoginProps {
    AuthActions: any,
    UserActions: any,
    message: string,
    form: any,
    exists: Map<{}, {}>,
    error: boolean,
    history: any,
    result: any,
    location: any
}


class Login extends Component<LoginProps> {

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'login'
        });
    }

    componentDidMount() {
        const { location } = this.props;
        const query = queryString.parse(location.search);

        if (query.expired !== undefined) {
            this.setError('세션에 만료되었습니다. 다시 로그인하세요.')
        }
    }
    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('login')
    }

    setError = (message) => {
        const { AuthActions } = this.props;
        AuthActions.setError({
            form: 'login',
            message
        });
        return false;
    }


    handleLocalLogin = async () => {
        const { form, AuthActions, UserActions, history } = this.props;
        const { email, password } = form.toJS();

        try {
            await AuthActions.localLogin({ email, password })
            .then(r => {
                console.log(r.data.token)
                const user = jwt(r.data.token); // decode your token here
                const loggedInfo = user
                UserActions.setLoggedInfo(loggedInfo);
                history.push('/');
                storage.set('loggedInfo', loggedInfo);
            }
            )


        } catch (e) {
            console.log(e);
            this.setError('잘못된 계정정보입니다.');
        }
    }
    render() {
        const { email, password } = this.props.form.toJS(); // form 에서 email 과 password 값을 읽어옴
        const { handleChange, handleLocalLogin } = this;
        const { error } = this.props;

        return (
            <AuthContent title="LOGIN">
                <LabelInput
                    label="이메일"
                    name="email"
                    placeholder="perfume@liche.com"
                    value={email}
                    onChange={handleChange} />
                <LabelInput
                    label="비밀번호"
                    name="password"
                    placeholder="*********"
                    type="password"
                    value={password}
                    onChange={handleChange} />
                {
                    error && <AuthError>{error}</AuthError>
                }
                <AuthButton onClick={handleLocalLogin}>Log In</AuthButton>
                <AlignedLink to="/auth/register">회원가입</AlignedLink>
            </AuthContent>
        );
    }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['login', 'form']),
        error: state.auth.getIn(['login', 'error']),
        result: state.auth.get('result')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(Login);