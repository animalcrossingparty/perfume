import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as detailActions from "redux/modules/detail";
import { Row, Col, Chip } from "react-materialize";
import { Circle } from "rc-progress";
import springPIC from "assets/images/spring.jpg";
import summerPIC from "assets/images/summer.jpg";
import autumnPIC from "assets/images/autumn.jpg";
import winterPIC from "assets/images/winter.jpg";

import { ReviewTextBox } from "components/";
import { withRouter } from "react-router";
import "../../css/DetailPage.css";
interface DetailProps {
  history: any;
  DetailActions: any;
  detail: any;
}

class Detail extends Component<DetailProps> {
  state = {
    progress: 0,
    accel: 50,
    interval: setInterval(() => 1, 5000),
  };
  addOne = () => {
    if (this.state.progress < this.props.detail.avg_rate.toFixed(1) * 10) {
      this.state.accel > 1
        ? this.setState({ accel: this.state.accel - 5 })
        : this.setState({ accel: 10 });
      this.setState({ progress: this.state.progress + 1 });
    } else {
      clearInterval(this.state.interval);
    }
  };
  initializeDetailInfo = async () => {
    const { DetailActions, history } = this.props;
    const perfume_id = history.location.pathname.split("/")[2];
    await DetailActions.getPerfumeDetail(perfume_id);
  };

  componentDidMount() {
    const interval = setInterval(this.addOne, this.state.accel);
    this.initializeDetailInfo();
    this.setState({ interval: interval });
  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    const { detail } = this.props;
    return (
      <div className="container mt-5">
        <section className="perfume-info-section">
          <Row>
            <Col s={6} className="perfume-info-image center" width="70%">
              <Row>
                <img src={detail.thumbnail} alt="" />
              </Row>
              <Row className="season-row">
                <Col
                  s={3}
                  style={{ backgroundImage: `url(${springPIC})` }}
                  className={
                    detail.seasons.some((elem) => elem === 1)
                      ? ""
                      : "disabled-season"
                  }
                >
                  봄
                </Col>
                <Col
                  s={3}
                  style={{ backgroundImage: `url(${summerPIC})` }}
                  className={
                    detail.seasons.some((elem) => elem === 2)
                      ? ""
                      : "disabled-season"
                  }
                >
                  여름
                </Col>
                <Col
                  s={3}
                  style={{ backgroundImage: `url(${autumnPIC})` }}
                  className={
                    detail.seasons.some((elem) => elem === 3)
                      ? ""
                      : "disabled-season"
                  }
                >
                  가을
                </Col>
                <Col
                  s={3}
                  style={{ backgroundImage: `url(${winterPIC})` }}
                  className={
                    detail.seasons.some((elem) => elem === 4)
                      ? ""
                      : "disabled-season"
                  }
                >
                  겨울
                </Col>
              </Row>
            </Col>
            <Col s={6} className="perfume-info-text">
              <p>{detail.launch_date.substr(0, 4)}년 출시</p>
              <small className="right">{detail.id}</small>
              <h4 className="mt-1"> {detail.name} </h4>
              <h5 className="perfume_brand">
                <small className="mr-3">made by</small>
                {detail.brand.name}{" "}
              </h5>
              <Row>
                <Col s={6}>
                  <h6>탑 노트</h6>
                  <small>뿌린 직후에서부터 알코올이 날아간 10분전후의 첫 번째 인상의 향</small>
                  <Row className="note-tags">
                    {detail.top_notes.length > 0 ? (
                      detail.top_notes.slice(0, 3).map((note, note_id) => (
                        <Chip
                          close={false}
                          options={null}
                          key={note_id}
                          className={`chip-color-${note_id % 10}`}
                        >
                          {note.kor_name || note.name}
                        </Chip>
                      ))
                    ) : (
                      <Chip close={false}>노트정보없음</Chip>
                    )}
                  </Row>
                  <h6>하트 노트</h6>
                  <small>향수를 뿌린 후, 30-60분후의 안정된 상태,향수의 구성 요소들이 조화롭게 배합을 이룬 향의 중간 단계이다.</small>
                  <Row className="note-tags">
                    {detail.heart_notes.length > 0 ? (
                      detail.heart_notes.slice(0, 3).map((note, note_id) => (
                        <Chip
                          close={false}
                          options={null}
                          key={note_id}
                          className={`chip-color-${note_id % 10}`}
                        >
                          {note.kor_name || note.name}
                        </Chip>
                      ))
                    ) : (
                      <Chip close={false}>노트정보없음</Chip>
                    )}
                  </Row>
                  <h6>베이스 노트</h6>
                  <small>2-3시간 후부터 모두 날아가기까지의 향, 향수를 뿌렸을 때 가장 많이 느낄 수 있는 향</small>
                  <Row className="note-tags">
                    {detail.base_notes.length > 0 ? (
                      detail.base_notes.slice(0, 3).map((note, note_id) => (
                        <Chip
                          close={false}
                          options={null}
                          key={note_id}
                          className={`chip-color-${note_id % 10}`}
                        >
                          {note.kor_name || note.name}
                        </Chip>
                      ))
                    ) : (
                      <Chip close={false}>노트정보없음</Chip>
                    )}
                  </Row>
                </Col>
                <Col s={6}>
                  <div className="rate-wrapper mt-5">
                    <div className="rate-inside-circle">
                      <h5>{detail.avg_rate.toFixed(1)}</h5>
                      <h5
                        style={{ fontSize: "1rem", lineHeight: "12rem" }}
                        className="mt-0"
                      >
                        리뷰 평균 평점
                      </h5>
                    </div>
                    <Circle
                      className="rate-circle"
                      percent={this.state.progress}
                      strokeWidth={4}
                      strokeColor={"pink"}
                      trailColor={"lightgray"}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>

        <div className="review_box">
          <div className="review_title">Reviews</div>
          <ReviewTextBox id={detail.id} />
        </div>
      </div>
    );
  }
}
export default withRouter(
  connect(
    (state) => ({
      detail: state.detail.get("detail"),
    }),
    (dispatch) => ({
      DetailActions: bindActionCreators(detailActions, dispatch),
    })
  )(Detail)
);
