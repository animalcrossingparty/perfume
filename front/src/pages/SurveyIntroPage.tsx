import React from 'react';
import { Header } from '../components'
import { Link } from 'react-router-dom'
import newbiePIC from 'assets/newbie.jpg'
import gosuPIC from 'assets/gosu.jpg'
import '../css/SurveyPage.css'

function SurveyIntroPage () {
return (
<div style={{backgroundColor: '#f9f9f9', minHeight: '100vh'}}>
  <Header />

    <div className="container" style={{paddingTop: '80px' }}>
      <div className="p-5" style={{backgroundColor: '#efefef'}}>
      <Link to="/survey">
        <div style={{backgroundImage: `url(${newbiePIC})`, backgroundColor: '#912fff', borderBottom: '0'}} className="survey-image" >
          <div className="surv-wrapper2">향수를 써 보지 않았어요.</div>
          <div className="surv-wrapper">로르 리시 챗봇 보러가기</div>
          </div>
        </Link>
          <Link to="/fsurvey">
        <div style={{backgroundImage: `url(${gosuPIC})`, backgroundColor: '#909090'}} className="survey-image">
          <div className="surv-wrapper2">사용하는 / 사용했던 향수가 있어요.</div>
          <div className="surv-wrapper">내가 쓴 향수 고르고 추천받기</div>
          </div>
          </Link>
        
      </div>

    </div>
</div>
)
}

export default SurveyIntroPage;