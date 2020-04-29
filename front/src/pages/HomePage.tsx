import React from "react";
import { Header, Slider, FooterContent } from "../components";
import {RandomPick} from '../containers/RandomPick'
import "../css/HomePage.css";
import { Footer, Icon, Row, Col } from "react-materialize";
import a from "assets/images/homegrid/a.webp";
import b from "assets/images/homegrid/b.webp";
import c from "assets/images/homegrid/c.webp";
import d from "assets/images/homegrid/d.webp";
import e from "assets/images/homegrid/e.webp";
function HomePage() {
  return (
    <div>
      <Header />
      <Slider />
      <h4 className="thin center">PICK YOUR FAVORITE</h4>
      <RandomPick />
      <div className="container">
        <h1 className="center thin">STORIES</h1>
        <Row className="px-5 m-0">
          <Col
            style={{ backgroundImage: `url(${a})`, height: "700px" }}
            className="homegrid p-5"
            s={4}
          >
            <h1 className="pt-5">조 말론</h1>
            <h4 className="center">넥타린블로썸 앤 허니 코롱</h4>
            <hr />
            <p>유쾌하고 활발한 느낌의 달콤한 향수.</p>
            <p>
              이른 아침 런천 코벤트 가든의 시장에서 온 넥타린 블로썸 앤 허니는
              유쾌한 상큼함을 더해 줄 수 있습니다. 아카시아 꿀 향기 속에 과즙이
              풍부한 천도 복숭아, 복숭아, 카씨스, 여린 봄 꽃이 녹아 있습니다.
              유쾌하고 활발한 느낌의 달콤한 향수입니다.
            </p>
          </Col>
          <Col
            style={{ backgroundImage: `url(${b})`, height: "700px" }}
            className="homegrid"
            s={8}
          ></Col>
        </Row>
        <Row className="px-5">
          <Col
            style={{ backgroundImage: `url(${c})`, height: "1200px" }}
            className="homegrid"
            s={7}
          ></Col>
          <Col className="p-0" s={5}>
            <div
              style={{ backgroundImage: `url(${d})`, height: "500px" }}
              className="homegrid"
            ></div>
            <div
              style={{ backgroundImage: `url(${e})`, height: "700px" }}
              className="homegrid"
            ></div>
          </Col>
        </Row>
      </div>
      <div className="container footer_container">
        <div className="home-section-devider">
          <p className="my-0">ABOUT</p>
        </div>
        <Row>
          <Col className="intro-box" s={4}>
            <Icon large>pie_chart</Icon>
            <h4>BIG DATA</h4>
            <p>
              4만여개의 향수 데이터와 수십만건의 리뷰 분석, 유저간의 일치도
              측정을 통해 신뢰성 있는 추천 향수를 제공합니다.
            </p>
          </Col>

          <Col className="intro-box" s={4}>
            <Icon large>devices</Icon>
            <h4>PC & MOBILE</h4>
            <p>언제 어디서나 향수 관련 정보를 찾아보세요.</p>
          </Col>

          <Col className="intro-box" s={4}>
            <Icon large>insert_chart_outlined</Icon>
            <h4>ANALYTICS</h4>
            <p>나이별, 성격별, 통계 자료를 볼 수 있어요.</p>
          </Col>
        </Row>
      </div>

      <Footer
        copyrights="2020 SSAFY DJ02-08"
        links={
          <ul className="text-gray">
            <li>
              <a href="#!">Github</a>
            </li>
            <li>
              <a href="#!">SSAFY</a>
            </li>
            <li>
              <a href="#!">SSAFY Instagram</a>
            </li>
            <li>
              <a href="#!">Buy us a coffee</a>
            </li>
          </ul>
        }
        moreLinks={
          <a
            className="grey-text text-lighten-4 right"
            href="https://www.notion.so/Laure-Richis-e89e794cf439444994ab31f82d06f37a"
          >
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
