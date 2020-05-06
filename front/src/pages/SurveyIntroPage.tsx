import React from 'react';
import { Header } from '../components'
import { Link } from 'react-router-dom'
import newbiePIC from 'assets/newbie.jpg'
import '../css/SurveyPage.css'

function SurveyIntroPage () {
return (
<div style={{backgroundColor: '#f9f9f9'}}>
  <Header />
    <div className="container hdown">
      <div style={{backgroundColor: '#efefef', marginTop: 64, fontSize: 60}}>
      <Link to={{pathname:"/expsurvey", state: 0}} >
        남성
        </Link>
        <hr/>
        <Link to={{pathname:"/expsurvey", state: 1}} >
        여성
        </Link>
        <hr/>
        <Link to={{pathname:"/expsurvey", state: 2}} >
        공용
        </Link>
        
      </div>

    </div>
</div>
)
}

export default SurveyIntroPage;