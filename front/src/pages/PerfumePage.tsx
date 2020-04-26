import React from 'react'
import { Header } from '../components'
import { Perfumes } from 'containers/Perfumes'
import '../css/HomePage.css'

function PerfumePage(history) {
  return (
    <div>
      <Header />
      <div className="container">
        <Perfumes history={history} />
      </div>
    </div>
  );
}

export default PerfumePage;
