import React from "react";
import { Header, Slider, FooterContent } from "../components";
import {RandomPick} from '../containers/RandomPick'
import "../css/HomePage.css";
import { Footer, Icon, Row, Col, Button } from "react-materialize";
import a from "assets/images/homegrid/a.png";
import c from "assets/images/homegrid/c.png";
import d from "assets/images/homegrid/d.png";
import { faGithub, faInstagram, faGitlab, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function HomePage() {
return (
<div>
  <Header />
  <Slider />

  {/* survey btn */}
  <div className="home_survey_btn_box">
    <div className="home_survey">
      <div className="home_survey_sc">
        * 향수를 사용해본적이 없다면</div>
      <Button className="home_survey_btn">로르 리시 챗봇 보러가기</Button>
    </div>

    <div className="home_survey">
      <div className="home_survey_sc">
        * 사용하는 / 사용했던 향수가 있다면</div>
      <Button className="home_survey_btn">내가 쓴 향수 고르고 추천받기 </Button>
    </div>
  </div>

  <h4 className="thin center home_sub">BELOVED ITEMS TODAY</h4>
  <RandomPick />
  {/* <h4 className="thin center home_sub">BELOVED BRANDS TODAY</h4> */}
  <h4 className="thin center home_sub">STORIES</h4>
  <div className="container">
    {/* <h1 className="center thin home_sub">STORIES</h1> */}

    {/* stories */}
    <Row className="px-5 my-4 m-0 header-center">
      <Col style={{ backgroundImage: `url(${a})`, width: '310px', height: "330px" }}
        className="homegrid ml-0">
      </Col>
      <div className="homegrid-header mb-12 ml-5">
        <h1 className="home-story-sub1-a">BVLGARI</h1>
        <h4 className="home-story-sub2">로즈 골데아</h4>
        <div className="homegrid-content">
          <div style={{fontWeight: 100, color: 'gray', fontSize: '13px', marginBottom: '1.5rem'}}>화려하고 부드러운 느낌의 플로럴 향수.
          </div>
          <div className="home-story-text">
            영원한 사랑의 꽃장미와 지구상
            가장 오래된 금속이자 아름다운 보석인 골드를 통해
            모든 이들의 마음속에 자리잡고 있는 영원한 아름다움의 상징인
            클레오파트라의 아름다움을 현대적으로 재해석한
            불가리의 새로운 여성향수 컬렉션
          </div>
        </div>
      </div>
    </Row>

    <Row className="my-4 m-0 header-d-f-reverse header-center">
      <div className="homegrid-header header-right-text mb-12">
        <h1 className="home-story-sub1-c">Jo Malone</h1>
        <h4  className="home-story-sub2">로즈 잉글리쉬 페어 앤 프리지아 코롱</h4>
        <div className="homegrid-content">
          <div style={{fontWeight: 100, color: 'gray', fontSize: '13px', marginBottom: '1.5rem'}}>은은하면서 신선하고 감미로운 향.</div>
          <div className="home-story-text">
            부드럽고 감미로운 향을 부여하는 잉글리쉬 페어 앤 프리지아는 가을의 정수라 할 수 있습니다.
            화이트 프리지아 부케향에 이제 막 익은 배의 신선함을 입히고,
            호박, 파출리, 우디향으로 은은함을 더했습니다. 
            감미롭고 특별한 향이 느껴집니다.
          </div>
        </div>
      </div>
      <Col style={{ backgroundImage: `url(${c})`, width: '310px', height: "350px" }}
        className="homegrid ml-0">
      </Col>
    </Row>

    <Row className="px-5 my-4 m-0 header-center">
      <Col style={{ backgroundImage: `url(${d})`, width: '410px', height: "320px" }}  className="homegrid ml-0">
      </Col>
      <div className="homegrid-header mb-12 ml-3 header-x-short-text">
        <h1 className="home-story-sub1-d">Miss Dior</h1>
        <h4 className="home-story-sub2">미스 디올 오 드 퍼퓸</h4>
        <div className="homegrid-content" style={{margin: '8% auto auto auto'}}>
          <div style={{fontWeight: 100, color: 'gray', fontSize: '13px', marginBottom: '1.5rem'}}>매혹적인 플로럴 향.</div>
          <div className="home-story-text">
            감각적인 그라스산 로즈와 생기 넘치는 로즈 우드가 섬세하게 어우러진
            미스 디올 오 드 퍼퓸의 향기를 경험해 보세요.</div>
          <i>“저는 플로럴 노트가 지닌 관능적이면서도 감각적인 향기를 표현하고자 했습니다.
            거부할 수 없이 빠져드는 사랑의 느낌처럼 강렬하게 느껴지는 향기를 원했죠. 
            마치 향기로 사랑을 선언하는 것처럼 말입니다."</i>
        </div>
      </div>

    </Row>
  </div>
  {/* <div className="container footer_container">
    <h1 className="thin">WHAT IT IS?</h1>
    <Row className="jcenter py-5" style={{background: 'none', alignItems:'center'}}>
      <Col className="intro-box" s={3}>
      <Icon large>pie_chart</Icon>
      <h4>BIG DATA</h4>
      <p>
        4만여개의 향수 데이터와 수십만건의 리뷰 분석, 유저간의 일치도
        측정을 통해 신뢰성 있는 추천 향수를 제공합니다.
      </p>
      </Col>

      <Col className="intro-box" s={3}>
      <Icon large>devices</Icon>
      <h4>PC & MOBILE</h4>
      <p>언제 어디서나 향수 관련 정보를 찾아보세요.</p>
      </Col>

      <Col className="intro-box" s={3}>
      <Icon large>insert_chart_outlined</Icon>
      <h4>ANALYTICS</h4>
      <p>나이별, 성격별, 통계 자료를 볼 수 있어요.</p>
      </Col>
    </Row>
  </div> */}

  <Footer copyrights="2020 SSAFY DJ02-08" links={ <ul className="fontaweseom_row">
    <li>
      <a href="#!" className="fontaweseom_footer">
        <FontAwesomeIcon icon={faGithub} /></a>
    </li>
    <li>
      <a href="#!" className="fontaweseom_footer">
        <FontAwesomeIcon icon={faGitlab} /></a>
    </li>
    <li>
      <a href="#!" className="fontaweseom_footer">
        <FontAwesomeIcon icon={faInstagram} /></a>
    </li>
    <li>
      <a href="#!" className="fontaweseom_footer">
        <FontAwesomeIcon icon={faYoutube} /></a>
    </li>
    </ul>
    }
    moreLinks={
    <a className="footer_notion right" href="https://www.notion.so/Laure-Richis-e89e794cf439444994ab31f82d06f37a">
      <Icon>supervised_user_circle</Icon>See Our Project on NOTION
    </a>
    }
    >
    <FooterContent />
  </Footer>
</div>
);
}

export default HomePage;