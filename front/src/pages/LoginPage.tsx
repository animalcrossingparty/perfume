import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'redux/modules/base';
import { Route } from 'react-router-dom';
import { LoginBox } from 'components/Auth';
import { Login, Register } from 'containers/Auth';
import styled from 'styled-components';
import bg from 'assets/detail-bg2.png';

const LoginPageBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
`;

class LoginPage extends Component {
    render() {
        return (
          <LoginPageBackground>
            <LoginBox>
                <Route path="/auth/login" component={Login}/>
                <Route path="/auth/register" component={Register}/>
            </LoginBox>
          </LoginPageBackground>
        );
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(LoginPage);