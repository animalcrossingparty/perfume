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
			height: 650,
			indicators: true,
			interval: 6000
		}}
	>
		<Slide image={<img alt="" src="https://images.unsplash.com/photo-1543593822-d283d968aa4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1330&q=80" />}>
			<Caption placement="center">
				<h3>
					대충 향수를 추천하겠다는 뜻
      </h3>
				<h5 className="light grey-text text-lighten-3">
					그것을 어떻게 해야할지는 모르지만
      </h5>
			</Caption>
		</Slide>
		<Slide image={<img alt="" src="https://images.unsplash.com/photo-1458538977777-0549b2370168?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80" />}>
			<Caption placement="left">
				<h3>
					대충 고급스러운 듯한 이미지
      </h3>
				<h5 className="light grey-text text-lighten-3">
					쇼핑몰 비스무리하게
      </h5>
			</Caption>
		</Slide>
		<Slide image={<img alt="" src="https://images.unsplash.com/photo-1554057009-4bb718be3f32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />}>
			<Caption placement="right">
				<h3>
					아무데서나 튀어나오는 문구
      </h3>
				<h5 className="light grey-text text-lighten-3">
					디자인 철학따윈 문과나 생각하는것.
      </h5>
			</Caption>
		</Slide>
		<Slide image={<img alt="" src="https://images.unsplash.com/photo-1508771400123-e194ad75c0e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1293&q=80" />}>
			<Caption placement="center">
				<h3>
					오늘도 난 커피를 마신다.
      </h3>
				<h5 className="light grey-text text-lighten-3">
					그래야 코드가 나오니까.
      </h5>
			</Caption>
		</Slide>
	</Slider>
)