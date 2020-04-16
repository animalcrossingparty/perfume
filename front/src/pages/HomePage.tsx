import React from 'react'
import { Header, Slider, Cards } from '../components'
import { Link } from 'react-router-dom'
import { Button } from 'react-materialize';

import '../css/HomePage.css'

function HomePage() {
return (
<div>
  <Header />
  <Slider />
  <div className="center btn_login">
    <div className="btns_home">
      <Link to="/auth/login">
      <Button>LOGIN</Button>
      </Link>

      <Link to="/survey">
      <Button>SURVEY</Button>
      </Link>
    </div>
    
    <div className="parti_sur">
      <div> </div>
      <div className="parti_text">* 로그인 하지 않아도 <br/> 조사에 참여할 수 있어요.</div>
    </div>

  </div>
  <h3 className="perfume_cards_title center">PERFUME LIST</h3>
  <div className="row ">
    <Cards />
    <Cards />
    <Cards />
    <Cards />
  </div>
</div>
);
}

export default HomePage;