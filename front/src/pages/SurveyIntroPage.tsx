import React from 'react';
import { Header } from '../components'
import { Link } from 'react-router-dom'
import newbiePIC from 'assets/newbie.jpg'
import '../css/SurveyPage.css'
import male from "assets/male_perfume.jpg"
import female from "assets/female_perfume.jpg"
import unisex from "assets/unisex_perfume.jpg"
import { TableRow } from '@material-ui/core';

function SurveyIntroPage () {
return (
<div style={{backgroundColor: '#f9f9f9'}}>
  <Header />
      <div className="container hdown ">
        <div className="surveyintro row" style={{ margin: '0 auto'}}>
          <div className="male">
            <div style={{backgroundColor: '#f9f9f9', marginTop: 64, fontSize: 60}}>
              <div className="male-img">
                <div style={{ backgroundImage: `url(${male})`, width: "200px", height: "200px", textAlign: 'center', backgroundSize: "cover"}}>
                </div>
                  <Link to={{pathname:"/expsurvey", state: 0}} style={{color: 'black'}}>
                    Male
                  </Link>
              </div>
            </div>
          </div>
          <div className="female">
            <div style={{backgroundColor: '#f9f9f9', marginTop: 64, fontSize: 60}}>
              <div className="female-img">
              <Link to={{pathname:"/expsurvey", state: 1}} style={{color: 'black'}}>
                <div style={{ backgroundImage: `url(${female})`, width: "200px", height: "200px", textAlign: 'center', backgroundSize: "cover"}}>
                </div>
                
                  Female
                </Link>
              </div>
            </div>
          </div>
          <div className="unisex">
            <div style={{backgroundColor: '#f9f9f9', marginTop: 64, fontSize: 60}}>
              <div className="unisex-img">
                <div style={{ backgroundImage: `url(${unisex})`, width: "200px", height: "200px", textAlign: 'center', backgroundSize: "cover"}}>
                </div>
                <Link to={{pathname:"/expsurvey", state: 2}} style={{color: 'black'}}>
                Unisex
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
)
}

export default SurveyIntroPage;