import React from 'react'
import { Header } from '../components'
import {Perfumes} from 'containers/Perfumes'
import { Link } from 'react-router-dom'
import { Button } from 'react-materialize';
import '../css/HomePage.css'

function HomePage() {
  return (
    <div>
      <Header />
      <div className="center btn_login">
        <Link to="/auth/login">
          <Button>LOGIN</Button>
        </Link>
      </div>
      <Perfumes/>
    </div>
  );
}

export default HomePage;
