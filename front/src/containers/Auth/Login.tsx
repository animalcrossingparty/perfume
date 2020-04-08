import React, { Component } from 'react';
import { AuthContent, LabelInput, AuthButton, AlignedLink } from 'components/Auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from 'redux/modules/auth';

class Login extends Component<{form: any, AuthActions: any }> {

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'login'
        });
    }

    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('login')
    }
    
    render() {
        const { email, password } = this.props.form.toJS(); // form 에서 email 과 password 값을 읽어옴
        const { handleChange } = this;
        return (
            <AuthContent title="LOGIN">
                <LabelInput 
                    label="이메일" 
                    name="email" 
                    placeholder="perfume@liche.com" 
                    value={email} 
                    onChange={handleChange}/>
                <LabelInput 
                    label="비밀번호" 
                    name="password" 
                    placeholder="*********" 
                    type="password" 
                    value={password} 
                    onChange={handleChange}/>
                <AuthButton>Log In</AuthButton>
                <AlignedLink to="/auth/register">회원가입</AlignedLink>
            </AuthContent>
        );
    }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['login', 'form'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(Login);