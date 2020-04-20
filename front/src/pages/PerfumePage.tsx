import React from 'react'
import { Header } from '../components'
import { Perfumes } from 'containers/Perfumes'
import '../css/HomePage.css'

function HomePage() {
  return (
    <div>
      <Header />
      <div className="container">
        <div>
          <h1>드롭다운 // 검색바</h1>
        </div>
        <Perfumes />
      </div>
    </div>
  );
}

export default HomePage;
