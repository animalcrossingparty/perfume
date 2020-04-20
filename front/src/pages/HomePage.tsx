import React from 'react'
import { Header, Slider } from '../components'
import '../css/HomePage.css'
import { Footer, Icon } from 'react-materialize'

function HomePage() {
  return (
    <div>
      <Header />
      <Slider />
      <div className="container footer_container">

        <div className="row ">
        </div>
        <Footer
          copyrights="2020 SSAFY DJ02-08"
          links={<ul><li><a className="grey-text text-lighten-3" href="#!">Github</a></li><li><a className="grey-text text-lighten-3" href="#!">SSAFY</a></li><li><a className="grey-text text-lighten-3" href="#!">SSAFY Instagram</a></li><li><a className="grey-text text-lighten-3" href="#!">Buy us a coffee</a></li></ul>}
          moreLinks={<a className="grey-text text-lighten-4 right" href="https://www.notion.so/Laure-Richis-e89e794cf439444994ab31f82d06f37a"><Icon>supervised_user_circle</Icon>See Our Project on NOTION</a>}
        >
          <h5 className="white-text">
            8팀 동물의 숲
          </h5>
          <p className="row">
            <p className="col footer-teammates">
              <Icon>face</Icon>
              <p>이경호</p>
            </p>
            <p className="col footer-teammates">
              <Icon>face</Icon>
              <p>남승현</p>
            </p>
            <p className="col footer-teammates">
              <Icon>face</Icon>
              <p>양혜진</p>
            </p>
            <p className="col footer-teammates">
              <Icon>face</Icon>
              <p>이해인</p>
            </p>
            <p className="col footer-teammates">
              <Icon>face</Icon>
              <p>박홍은</p>
            </p>
          </p>
        </Footer>
      </div>
    </div>
  );
}

export default HomePage;