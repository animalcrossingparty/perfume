import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as detailActions from "redux/modules/detail";
import { Row, Col, Chip, Icon } from "react-materialize";
import { Circle } from "rc-progress";
import springPIC from "assets/images/spring.jpg";
import summerPIC from "assets/images/summer.jpg";
import autumnPIC from "assets/images/autumn.jpg";
import winterPIC from "assets/images/winter.jpg";
import { Link } from "react-router-dom";
import { ReviewTextBox } from "components/";
import { withRouter } from "react-router";
import "../../css/DetailPage.css";
interface DetailProps {
  history: any;
  DetailActions: any;
  detail: any;
  user: any;
}

class Detail extends Component<DetailProps> {
  state = {
    progress: 0,
    accel: 50,
    interval: setInterval(() => 1, 5000),
  };
  componentWillReceiveProps(nextProps){
      this.initializeDetailInfo()
  }
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
  handleTagClick = (e, id) => {
    const { history } = this.props;
    history.push(
      `/perfume?page=1&sort=rate&category=all&gender=all&include=${id}&brand=all`
    );
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
  makeComma = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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
                ></Col>
                <Col
                  s={3}
                  style={{ backgroundImage: `url(${summerPIC})` }}
                  className={
                    detail.seasons.some((elem) => elem === 2)
                      ? ""
                      : "disabled-season"
                  }
                ></Col>
                <Col
                  s={3}
                  style={{ backgroundImage: `url(${autumnPIC})` }}
                  className={
                    detail.seasons.some((elem) => elem === 3)
                      ? ""
                      : "disabled-season"
                  }
                ></Col>
                <Col
                  s={3}
                  style={{ backgroundImage: `url(${winterPIC})` }}
                  className={
                    detail.seasons.some((elem) => elem === 4)
                      ? ""
                      : "disabled-season"
                  }
                ></Col>
              </Row>
            </Col>
            <Col s={6} className="perfume-info-text">
              <p>{detail.launch_date.substr(0, 4)}년 출시</p>
              <small className="right">{detail.id}</small>
              <h4 className="mt-1"> {detail.name} </h4>
              <h5 className="perfume_brand">
                <small className="detail_price">
                  {detail.price
                    ? "₩ " + this.makeComma(detail.price.toFixed(0)) + " 원"
                    : "가격 정보가 없습니다"}
                </small>
                <small>made by</small>
                {detail.brand.name}{" "}
              </h5>
              <Row className="categories-row m-0">
                <p>CATEGORY</p>
                {detail.categories.map((cat) => (
                  <span key={"d-category-" + cat.id}>{cat.name}</span>
                ))}
              </Row>
              <Row className="note-and-rate-row">
                <Col s={6}>
                  <h6>탑 노트</h6>
                  <small>
                    뿌린 직후에서부터 알코올이 날아간 10분전후의 첫 번째 인상의
                    향
                  </small>
                  <Row className="note-tags">
                    {detail.top_notes.length > 0 ? (
                      detail.top_notes.slice(0, 3).map((note, note_id) => (
                        <Chip
                          close={false}
                          onClick={(e) => this.handleTagClick(e, note.id)}
                          key={note.id + "-tnote"}
                          className={`chip-color-${note.id % 10}`}
                        >
                          {note.kor_name || note.name}
                        </Chip>
                      ))
                    ) : (
                      <Chip close={false}>노트정보없음</Chip>
                    )}
                  </Row>
                  <h6>하트 노트</h6>
                  <small>
                    향수를 뿌린 후, 30-60분후의 안정된 상태,향수의 구성 요소들이
                    조화롭게 배합을 이룬 향의 중간 단계이다.
                  </small>
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
                  <small>
                    2-3시간 후부터 모두 날아가기까지의 향, 향수를 뿌렸을 때 가장
                    많이 느낄 수 있는 향
                  </small>
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
                  <div className="rate-wrapper pt-5">
                    <div className="rate-inside-circle">
                      <h5>{detail.avg_rate.toFixed(1)}</h5>
                      <h5
                        style={{ fontSize: "16px", lineHeight: "192px" }}
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

        <h5 className="thin center">{detail.name}과 비슷한 향수들</h5>
        <section className="similar-container">
          {detail.similar && detail.similar.length > 3 ? (
            detail.similar
              .substr(1, detail.similar.length - 2)
              .split(", ")
              .map((sim) => (
                <Link
                  to={`/detail/${sim}`}
                  className="each-similar"
                  key={sim + "th"}
                  style={{
                    backgroundImage: `url(http://i02b208.p.ssafy.io:8000/staticfiles/images/${sim}.jpg)`,
                  }}
                />
              ))
          ) : (
            <div>비슷한 향수 데이터가 없습니다.</div>
          )}
        </section>
        <h5 className="thin center">
          {detail.name}을 좋아하는 유저가 선택한 향수들
        </h5>
        <section className="similar-container">
          {detail.recommended && detail.recommended.length > 3 ? (
            detail.recommended
              .substr(1, detail.recommended.length - 2)
              .split(", ")
              .map((sim) => (
                <Link
                  to={`/detail/${sim}`}
                  className="each-similar"
                  key={sim + "th"}
                  style={{
                    backgroundImage: `url(http://i02b208.p.ssafy.io:8000/staticfiles/images/${sim}.jpg)`,
                  }}
                />
              ))
          ) : (
            <div>추천 향수 데이터가 없습니다.</div>
          )}
        </section>
        <div className="review-list-header">
          {detail.reviews
            ? "Reviews - " + detail.reviews.length
            : "여러분의 소중한 리뷰를 남겨주세요"}
        </div>

        <section className="review-list-container">
          {detail.reviews ? (
            detail.reviews.map((review) => (
              <Row className="review-list-row" key={review.id + "-re"}>
                <Col s={12} className="review-header">
                  <img
                    alt=""
                    className="rank-badge"
                    src="https://user-images.githubusercontent.com/52684457/79992592-aabfc980-84ee-11ea-8cdf-38f19f9d7305.png"
                  />
                  <Col>
                    <p className="m-0 username">{review.user}</p>
                    <small>{review.created_at}</small>
                  </Col>
                </Col>
                <Col s={3} className="review-function">
                  <Row className="star-row">
                    <Icon small>star</Icon>
                    <p className="m-0 ml-2">{(review.rate / 2).toFixed(1)}</p>
                  </Row>
                  <Row>
                    <Icon medium>thumb_up</Icon>
                    <h6 className="ml-3 mt-0">{review.like_cnt}</h6>
                  </Row>
                </Col>
                <Col s={9} className="review-content">
                  {review.content}
                </Col>
              </Row>
            ))
          ) : (
            <h4>리뷰가 없어용</h4>
          )}
          {this.props.user.get("logged") ? (
            <ReviewTextBox id={detail.id} />
          ) : (
            <h4>로그인해서 댓글작성</h4>
          )}
        </section>
      </div>
    );
  }
}
export default withRouter(
  connect(
    (state) => ({
      detail: state.detail.get("detail"),
      user: state.user,
    }),
    (dispatch) => ({
      DetailActions: bindActionCreators(detailActions, dispatch),
    })
  )(Detail)
);
