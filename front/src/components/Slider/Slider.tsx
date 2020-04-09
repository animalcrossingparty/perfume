import React from 'react'
import 'materialize-css';
// import { Link } from 'react-router-dom'
import { Slider, Caption, Slide } from 'react-materialize';
import './Slider.css'

export default () => (
	<Slider
		fullscreen={false}
		options={{
			duration: 500,
			height: 450,
			indicators: true,
			interval: 6000
		}}
	>
		<Slide image={<img alt="" src="https://user-images.githubusercontent.com/52684457/78926430-0a25de80-7ad8-11ea-8043-bef5c73d3449.jpg" />}>
			<Caption placement="center">
				<h3>
					로르 리시에 오신 것을 환영합니다.
      </h3>
				<h5 className="light grey-text text-lighten-3">
					어떤 향수를 찾고 계신가요?
      </h5>
			</Caption>
		</Slide>
		<Slide image={<img alt="" src="https://user-images.githubusercontent.com/52684457/78929034-9d611300-7adc-11ea-8237-8b95173a22a0.png" />}>
			<Caption placement="left">
				<h3>
					4월 달, 인기 향수 계열은 플로럴
      </h3>
				<h5 className="light grey-text text-lighten-3">
					봄이 지나가기 전에 골라야 할 향수가 있다면?
      </h5>
			</Caption>
		</Slide>
		<Slide image={<img alt="" src="https://user-images.githubusercontent.com/52684457/78929383-44de4580-7add-11ea-9719-375df77dd8ba.jpg" />}>
			<Caption placement="center">
				<h3>
					당신이 애타게 찾던 향수는?
      </h3>
				<h5 className="light grey-text text-lighten-3">
					로르 리시에서 향수를 찾을 수 있어요.
      </h5>
			</Caption>
		</Slide>
		<Slide image={<img alt="" src="https://user-images.githubusercontent.com/52684457/78928424-8b32a500-7adb-11ea-9b99-8263dd84b603.jpg" />}>
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