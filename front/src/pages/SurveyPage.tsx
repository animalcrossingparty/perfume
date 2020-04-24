import React from 'react';
import { Header } from '../components'
import {Survey} from '../containers/Survey'
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom'
import '../css/SurveyPage.css'

function SurveyPage () {
return (
<div>
  <Header />

  <div className="survey_box">
    <div className="title">Survey
    </div>
    <p>로르 리시가 여러분에게 어울리는 향수를 더 잘 찾기위해 몇 가지만 물어볼게요.</p>
    <div className="survey_inner_container">
      <Survey />
    </div>
    
    <div className="submit_survey">
      <Link to="/">
      <Button>SUBMIT</Button>
      </Link>
    </div>
  </div>
</div>
)
}

export default SurveyPage;