import React from 'react';
import { Header,  FooterContent, Members } from "../components";
import { Footer, Icon, Row, Col } from "react-materialize";
function AboutPage() {
  return (
    <section>
      <Header />
      <h1 className="mt-5 pt-5">LAURE RICHIS</h1> <h2>로르 리시</h2>
      
      <Members />
      <div className="container footer_container">
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
    </section>
  );
}

export default AboutPage;
