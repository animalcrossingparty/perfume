import React from 'react'
import 'materialize-css';
import { Link } from 'react-router-dom'
import { Navbar, NavItem, Icon } from 'react-materialize';
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
  <NavItem>
    <Link to="/perfume">PERFUME</Link>
  </NavItem>
	<NavItem>
	PRODUCTS
  </NavItem>
	<NavItem>
	NEWS
  </NavItem>
	<NavItem>
	STORY
  </NavItem>
  <NavItem>
    CS
  </NavItem>
</Navbar>
);