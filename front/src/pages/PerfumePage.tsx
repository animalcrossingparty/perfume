import React from 'react'
import { Header } from '../components'
import { Perfumes } from 'containers/Perfumes'
import '../css/HomePage.css'

function PerfumePage(history) {
  return (
    <div style={{minHeight: '100vh', overflow:'hidden'}}>
      <Header />
      <Perfumes history={history} />
    </div>
  );
}

export default PerfumePage;
