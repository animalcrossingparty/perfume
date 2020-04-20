import React from 'react'
import 'materialize-css';
import { Link } from 'react-router-dom'
import { Navbar, Icon } from 'react-materialize';
import './Header.css'

export default () => (
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
    <Link to="/perfume?page=1">PERFUME</Link>
    <Link to="/">NEWS</Link>
    <Link to="/">ABOUT</Link>
    <Link to="/survey">SURVEY</Link>
    <Link to="/auth/login">
      LOGIN
    </Link>
  </Navbar>
);