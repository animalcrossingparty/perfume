import React from 'react';
import { Header } from '../components'
import {Survey} from '../containers/Survey'
import '../css/SurveyPage.css'

function SurveyPage () {
return (
<div>
  <Header />

  <div className="survey_box">
    <div className="title">Survey
    </div>
    <div className="survey_inner_container">
      <Survey />
    </div>
  </div>
</div>
)
}

export default SurveyPage;