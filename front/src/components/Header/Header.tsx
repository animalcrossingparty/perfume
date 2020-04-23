import React, {Component} from 'react'
import { connect } from 'react-redux';
import * as userActions from 'redux/modules/user';
import { bindActionCreators } from 'redux';
import storage from 'lib/storage';
import 'materialize-css';
import { Link, NavLink } from 'react-router-dom'
import { Navbar, Icon } from 'react-materialize';
import './Header.css'

interface HeaderProps {
    UserActions: any,
		user: any,
    history: any,
}
class Header extends Component<HeaderProps>{

  handleLogout = async () => {
    const { UserActions, history } = this.props;
    try {
        await UserActions.logout();
				history.push('/')
    } catch (e) {
        console.log(e);
    }

    storage.remove('loggedInfo');
    window.location.href = '/'; // 홈페이지로 새로고침
}

 render() {
   return(
  <Navbar
    alignLinks="right"
    brand={<Link className="brand-logo" to="/">LAURE RICHIS</Link>}
    id="mobile-nav"
    menuIcon={<Icon>menu</Icon>}
    options={{
      draggable: false,
      edge: 'left',
      inDuration: 250,
      onCloseEnd: null,
      onCloseStart: null,
      onOpenEnd: null,
      onOpenStart: null,
      outDuration: 200,
      preventScrolling: true
    }}
  >
    <NavLink to={`/perfume?page=1&sort=alpha&category=all&gender=all&include=all&exclude=None&brand=all`}>PERFUME</NavLink>
    <Link to="/">NEWS</Link>
    <Link to="/">ABOUT</Link>
    <Link to="/survey">SURVEY</Link>
		{ this.props.user.get('logged') 
				? (<div onClick={this.handleLogout}>
						{this.props.user.getIn(['loggedInfo', 'username'])} <span >(로그아웃)</span>
				</div> )
				: <Link to="/auth/login">
      LOGIN
    </Link>
		}

  </Navbar>
);
 }
}

export default connect(
    (state) => ({
        user: state.user
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(Header);