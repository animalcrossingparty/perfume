import React from 'react'
import { LoginBox } from 'components/Auth'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'redux/modules/base';

function LoginPage() {
  return (
    <div>
      <h1>우왕 로그인</h1>
      <LoginBox children="" />
    </div>
  );
}

export default LoginPage;
