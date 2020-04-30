import React from "react";
import { Header, Slider, FooterContent } from "../components";
import {RandomPick} from '../containers/RandomPick'
import "../css/HomePage.css";
import { Footer, Icon, Row, Col } from "react-materialize";
import a from "assets/images/homegrid/a.jpg";
import b from "assets/images/homegrid/b.png";
import c from "assets/images/homegrid/c.png";
import d from "assets/images/homegrid/d.jpg";
import e from "assets/images/homegrid/e.webp";
function HomePage() {
  return (
    <div>
      <Header />
      <Slider />
      <h4 className="thin center">BELOVED ITEMS TODAY</h4>
      <RandomPick />
      <div className="container">
        <h1 className="center thin">STORIES</h1>
        <Row className="px-5 m-0">
          <Col
            style={{ backgroundImage: `url(${a})`, height: "700px" }}
            className="homegrid p-5"
            s={4}
          >
            <h1 className="pt-5">불가리</h1>
            <h4 className="center">로즈 골데아</h4>
            <hr />
            <p>화려하고 부드러운 느낌의 플로럴 향수.</p>
            <p>
              영원한 사랑의 꽃장미와 지구상 가장 오래된 금속이자 아름다운 보석인 골드를 통해
              모든 이들의 마음속에 자리잡고 있는 영원한 아름다움의 상징인 클레오파트라의 아름다움을
              현대적으로 재해석한 불가리의 새로운 여성향수 컬렉션
            </p>
          </Col>
          <Col
            style={{ backgroundImage: `url(${b})`, height: "700px" }}
            className="homegrid"
            s={8}
          >
            <h1 className="pt-5">크리드</h1>
            <h4 className="center">버진 아일랜드 워터</h4>
            <hr />
            <p>시원하고 상쾌한 느낌의 향수.</p>
            <p>
              크루즈를 타고 카르브 해의 Ginger 섬을 향해가던 중 영감을 얻어 만들어진 향수.
              휴양지 버진 아일랜드에서 가져온 이름처럼 여러 열대과일의 향을 추출해
              달콤하면서 새콤한 칵테일이 생각나며 잔잔한 카리브 해의 바다 바람을 연상시킵니다.
              시원함과 따뜻함이 모두 느껴져 1년 내내 사용이 가능합니다.
            </p>
          </Col>
        </Row>
        <Row className="px-5">
          <Col
            style={{ backgroundImage: `url(${c})`, height: "1200px" }}
            className="homegrid"
            s={7}
          >
            <h1 className="pt-5">조말론</h1>
            <h4 className="center">잉글리쉬 페어 앤 프리지아 코롱</h4>
            <hr />
            <p>은은하면서 신선하고 감미로운 향.</p>
            <p>
             부드럽고 감미로운 향을 부여하는 잉글리쉬 페어 앤 프리지아는 가을의 정수라 할 수 있습니다.
             화이트 프리지아 부케향에 이제 막 익은 배의 신선함을 입히고, 
             호박, 파출리, 우디향으로 은은함을 더했습니다. 
             감미롭고 특별한 향이 느껴집니다.
            </p>
          </Col>
          <Col className="p-0" s={5}>
            <div
              style={{ backgroundImage: `url(${d})`, height: "500px" }}
              className="homegrid"
            >
            <h1 className="pt-5">미스 디올</h1>
            <h4 className="center">미스 디올 오 드 퍼퓸</h4>
            <hr />
            <p>매혹적인 플로럴 향.</p>
            <p>
            감각적인 그라스산 로즈와 생기 넘치는 로즈 우드가 섬세하게 어우러진 미스 디올 오 드 퍼퓸의 향기를 경험해 보세요.
            거부할 수 없는 매혹적인 플로럴 향이 현대 여성의 당당한 아름다움을 표현합니다.
            “저는 플로럴 노트가 지닌 관능적이면서도 감각적인 향기를 표현하고자 했습니다. 
            거부할 수 없이 빠져드는 사랑의 느낌처럼 강렬하게 느껴지는 향기를 원했죠. 
            마치 향기로 사랑을 선언하는 것처럼 말입니다."
            </p>
            </div>
            <div
              style={{ backgroundImage: `url(${e})`, height: "700px" }}
              className="homegrid"
            >

            </div>
          </Col>
        </Row>
      </div>
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
    </div>
  );
}

export default HomePage;
