import React from 'react'
import { Header, Slider } from '../components'
import { Link } from 'react-router-dom'
import { Button } from 'react-materialize';
import '../css/HomePage.css'

function HomePage() {
  return (
    <div>
      <Header />
      <Slider />
      <div className="center btn_login">
        <Link to="/auth/login">
          <Button>LOGIN</Button>
        </Link>
      </div>
      <h3 className="perfume_cards_title center">PERFUME LIST</h3>
    </div>
  );
}

export default HomePage;
