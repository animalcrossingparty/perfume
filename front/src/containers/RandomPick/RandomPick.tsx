import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as perfumeActions from "redux/modules/perfume";
import {
  Row,
  Col,
} from "react-materialize";


interface RandomProps {
  PerfumeActions: any;
  perfumes: any;
  history: any;
}

class RandomPick extends Component<RandomProps> {
  initializePerfumeInfo = async () => {
    const { PerfumeActions } = this.props;
    await PerfumeActions.getRandomInfo();
  };

  componentDidMount() {
    this.initializePerfumeInfo();
  }



  render() {
    return (
    <Row>
    <Col s={2}>
      <div style={{ height: "300px", background: "blue" }}></div>
    </Col>
    <Col s={2}>
      <div style={{ height: "300px", background: "blue" }}></div>
    </Col>
    <Col s={2}>
      <div style={{ height: "300px", background: "blue" }}></div>
    </Col>
    <Col s={2}>
      <div style={{ height: "300px", background: "blue" }}></div>
    </Col>
    <Col s={2}>
      <div style={{ height: "300px", background: "blue" }}></div>
    </Col>
    <Col s={2}>
      <div style={{ height: "300px", background: "blue" }}></div>
    </Col>
  </Row>
  
    )
  }
}

export default connect(
  (state) => ({
    perfumes: state.perfume.get("randList")
  }),
  (dispatch) => ({
    PerfumeActions: bindActionCreators(perfumeActions, dispatch),
  })
)(RandomPick);
