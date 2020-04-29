import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "redux/modules/user";
import { bindActionCreators } from "redux";
import storage from "lib/storage";
import "materialize-css";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Icon, Dropdown, Divider } from "react-materialize";
import "./Header.css";

interface HeaderProps {
  UserActions: any;
  user: any;
  history: any;
}
class Header extends Component<HeaderProps> {
  handleLogout = async () => {
    const { UserActions, history } = this.props;
    try {
      await UserActions.logout();
      history.push("/");
    } catch (e) {
      console.log(e);
    }

    storage.remove("loggedInfo");
    window.location.href = "/"; // 홈페이지로 새로고침
  };

  render() {
    return (
      <Navbar
        alignLinks="right"
        className="header-box"
        brand={
          <Link className="brand-logo" to="/">
            LAURE RICHIS
          </Link>
        }
        id="mobile-nav"
        menuIcon={<Icon>menu</Icon>}
        fixed={false}
        options={{
          draggable: false,
          edge: "left",
          inDuration: 300,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: false,
        }}
      >
        <NavLink
          to={`/perfume?page=1&sort=rate&category=all&gender=all&include=all&exclude=None&brand=all`}
        >
          PERFUMES
        </NavLink>
        <Link to="/surveyintro">SURVEY</Link>
        <Link to="/">REVIEWS</Link>
        <Link to="/about">ABOUT</Link>
        {this.props.user.get("logged") ? (
          <Dropdown
          id="dropdown_user"
          options={{
            alignment: 'right',
            autoTrigger: true,
            closeOnClick: true,
            constrainWidth: true,
            container: null,
            coverTrigger: true,
            hover: true,
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 250
          }}
          trigger={<div >{this.props.user.getIn(["loggedInfo", "username"])}</div>}
        >
          <Link style={{pointerEvents: "none"}} to="#" >
            {this.props.user.getIn(["loggedInfo", "username"])}
          </Link>
          <Divider />
          <Link to="#">124 points</Link>
          
          <Divider />
          <Link to="#" onClick={this.handleLogout}>
            LOGOUT
          </Link>
        </Dropdown>
        ) : (
          <Link to="/auth/login">LOGIN</Link>
        )}
      </Navbar>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(Header);
