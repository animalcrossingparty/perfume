import React from 'react'
import 'materialize-css';
import { Slider, Caption, Slide, Button } from 'react-materialize';
import {Link } from 'react-router-dom'
import './Slider.css'
import s1 from 'assets/s1-min.webp'
import s2 from 'assets/s2-min.jpg'
import s3 from 'assets/s3-min.jpg'
import s4 from 'assets/s4-min.jpg'


export default () => (
	<Slider
		fullscreen={false}
		options={{
			duration: 500,
			height: window.outerHeight * 0.8,
			indicators: true,
			interval: 10000000
		}}
	>
		<Slide image={<img alt="" src={s1} />}>
			<Caption placement="left" className="s1-cap">
				<h3>
					로르 리시 Laure Richis
      	</h3>
				<small>FRUITS & CITRUS</small>
				<h5 className="left ml-5 mt-0 row">
					봄에 어울리는 산뜻한 과일향 <Button className="slider-btn">츄-릅</Button>
      	</h5>
			</Caption>
		</Slide>
		<Slide image={<img alt="" src={s2} />}>
			<Caption placement="left">
				<h3>
					4월 달, 인기 향수 계열은 플로럴
      </h3>
				<h5>
					봄이 지나가기 전에 골라야 할 향수가 있다면?
      </h5>
			</Caption>
		</Slide>
		<Slide image={<img alt="" src={s3} />}>
			<Caption placement="center">
				<h3>
					당신이 애타게 찾던 향수는?
      </h3>
				<h5>
					로르 리시에서 향수를 찾을 수 있어요.
      </h5>
			<Link className="my-5" to="/survey"><Button large style={{backgroundColor: '#fff', color: '#2f2f2f', fontWeight: '700'}} className="mt-5">나에게 꼭 맞는 향수 찾으러가기</Button></Link>

			</Caption>
		</Slide>
		<Slide image={<img alt="" src={s4} />}>
			<Caption placement="left">
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