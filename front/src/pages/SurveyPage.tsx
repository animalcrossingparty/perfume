import React from 'react';
import { Header } from '../components'
import {Survey} from '../containers/Survey'
import icon_l from '../assets/images/icon.png'
import { Link } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close';
import '../css/SurveyPage.css'

function SurveyPage () {
return (
<div className="bg_no_scroll" style={{ height: '100%', backgroundColor: 'white' }}>
  <Header />
  <div className="survey_chatbot_title">
    <div className="chatbot_start">
      <img src={icon_l} alt="" style={{ width: '30px' }} />
      SURVEY CHATBOT
    </div>
    <div className="chatbot_end">
      <Link to="/">
      <CloseIcon />
      </Link>
    </div>
  </div>
  <div className="survey_box">
    {/* <div className="chatbot_banner">
      <div className="welcome_chatbot">
        WELCOME TO
      </div>
      <img src={icon_b} alt="" style={{ width: '100px' }} />
      LAURE RICHIS
    </div> */}
    <div className="row_cate">
    <div className="cate_you">
      About You
    </div>
      <div className="cate_other"></div>
      <div className="cate_other"></div>
    </div>
    <div className="cate_to">
    </div>
    <div className="survey_inner_container">
      <Survey />
    </div>
    <div className="cate_to-2"></div>
  </div>
</div>
)
}

export default SurveyPage;