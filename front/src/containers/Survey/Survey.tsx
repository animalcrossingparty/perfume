import React, { Component } from 'react';
import { connect } from 'react-redux';

class Survey extends Component<{}> {
  componentDidMount() {
    // 대충 향수를 불러 오겠다는 곳
  }
  render() {
    return(
      <div>와 향수들이다!!</div>
    )
  }
}

export default connect(
  (state) => ({
    // 뭔가 스토어에 불러오면 기분이 좋지 않을까?
  }),
  (dispatch) => ({
    // 대충 향수를 디스패치 하겠다는 곳
  })
)(Survey);