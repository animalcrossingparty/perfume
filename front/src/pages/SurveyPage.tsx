import React from 'react';
import { Header, Date, Categories } from '../components'
import { Switch, Checkbox } from 'react-materialize';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom'
import '../css/SurveyPage.css'

function SurveyPage () {
return (
<div className="bg">
  <Header />

  <div className="survey_box">
    <div className="title">Survey</div>
    <div className="content">
      {/* age */}
      <div className="titles">
        AGE
      </div>
      <div className="age_">
        <Date />
      </div>

      {/* gender */}
      <div className="titles">
        GENDER
      </div>
      <div className="gender_">
        <div className="gender_text">
          <div className="gender_1">M</div>ale
        </div>
        <Switch id="Switch-11" offLabel="Off" onChange={function noRefCheck(){}} onLabel="On" />
        <div className="gender_text">
          <div className="gender_2">Fe</div>male
        </div>
      </div>

      {/* season */}
      <div className="titles">
        SEASON
      </div>
      <div className="sub_title">
        * 향수를 사용 할 계절을 선택해주세요.
      </div>
      <div className="season">
        <Checkbox id="Spring" label="Spring" value="Spring" />
        <Checkbox id="Summer" label="Summer" value="Summer" />
        <Checkbox id="Fall" label="Fall" value="Fall" />
        <Checkbox id="Winter" label="Winter" value="Winter" />
      </div>


      {/* catecory */}
      <div className="titles">
        CATECORY
      </div>

      {/* favorite category */}
      <div className="sub_title">
        * 가장 선호하는 카테고리를 선택해주세요.
      </div>
      {/* search bar 같은 기능으로 데이터 검색이 되면 편리할 것 같다. */}
      {/* 잘 모르는 사람들을 위해 인기 많은 카테고리들을 나열해도 될 것 같다. */}
      <Categories />
      <div className="rem"></div>

      {/* 3 Note in selected category */}
      <div className="sub_title">
        * 선택한 카테고리 내에 마음에드는 노트를 3가지 이상 선택해주세요.
      </div>
      <div className="season">
        <Checkbox filledIn id="Acacia" label="Acacia" value="Acacia" />
        <Checkbox filledIn id="Rose" label="Rose" value="Rose" />
        <Checkbox filledIn id="Blossom" label="Blossom" value="Blossom" />
        <Checkbox filledIn id="Chamomile" label="Chamomile" value="Chamomile" />
        <Checkbox filledIn id="Cotton" label="Cotton" value="Cotton" />
        <Checkbox filledIn id="Freesia" label="Freesia" value="Freesia" />
        <Checkbox filledIn id="Hyssop" label="Hyssop" value="Hyssop" />
        <Checkbox filledIn id="Iris" label="Iris" value="Iris" />
        <Checkbox filledIn id="Lilac" label="Lilac" value="Lilac" />
      </div>
      <div className="tags">
        {/*
        <NoteTags /> */}
      </div>
      <div className="rem"></div>
      <div className="rem"></div>

      {/* Dislike category */}
      <div className="sub_title">
        * 기피하고 싶은 카테고리를 선택해주세요. (0~2개)
      </div>
      <Categories />
      <div className="rem"></div>

    </div>

    <div className="submit_survey">
      <Link to ="/">
        <Button>SUBMIT</Button>
      </Link>
    </div>
  </div>
</div>
)
}

export default SurveyPage;