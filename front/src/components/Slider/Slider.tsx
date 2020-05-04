import React from 'react'
import 'materialize-css';
import { Slider, Caption, Slide, Button } from 'react-materialize';
import {Link } from 'react-router-dom'
import './Slider.css'
import s1 from 'assets/s1-min.webp'
import s2 from 'assets/s2-min.png'
import s3 from 'assets/s3-min.jpg'
import s4 from 'assets/s4-min.png'


export default () => (
	<Slider
		fullscreen={false}
		options={{
			duration: 500,
			height: window.outerHeight * 1,
			indicators: true,
			interval: 10000000
		}}
	>
		<Slide image={<img alt="" src={s1} />}>
			<Caption placement="right" className="s1-cap s-font">
				<h3>
					로르 리시 Laure Richis
      	</h3>
				<h5 className="right ml-5 mt-0 row">
					봄에 어울리는 산뜻한 과일향 <Button className="slider-btn">츄-릅</Button>
					
      	</h5>
				<small>FRUITS & CITRUS</small>
			</Caption>
		</Slide>
		<Slide image={<img alt="" src={s2} />}>
			<Caption placement="left" className="s-font" style={{color: '#2f2f2f'}}>
				<h3 className="mt-5" style={{marginLeft: -200, fontWeight: 100}}>
					5월 달, 인기 향수 계열은 플로럴
      </h3>
				<h5>
					봄이 지나가기 전에 골라야 할 향수가 있다면?
      </h5>
			</Caption>
		</Slide>
		<Slide image={<img alt="" src={s3} />}>
			<Caption placement="center" className="s-font">
				<h3 className="mt-5" style={{textShadow: '0 0 5px white'}}>
					당신이 애타게 찾던 향수는?
      </h3>
			<Link className="my-5" to="/surveyintro"><Button large style={{backgroundColor: '#D0A9F5', color: '#2f2f2f', fontWeight: '700'}} className="mt-5">나에게 꼭 맞는 향수 찾으러가기</Button></Link>

			</Caption>
		</Slide>
		<Slide image={<img alt="" src={s4} />}>
			<Caption placement="left" className="s-font">
				<h3>
					여름에는 어떤 향수를 뿌리면 좋을까?
      </h3>
				<h5 className="light grey-text text-lighten-3">
					곧 여름 시즌이 다가오고 있어요!
      </h5>
			</Caption>
		</Slide>
	</Slider>
)