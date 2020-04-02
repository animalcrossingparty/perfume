import React from 'react'
import { Header, Slider } from '../components'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div>
      <Header />
      <Slider />
      <div className="center">
        <Link to="/auth/login">로그인 페이지로 가기</Link>
      </div>
      <h1 className="center">대충 카드를 넣고싶은 곳</h1>
    </div>
  );
}

export default HomePage;
