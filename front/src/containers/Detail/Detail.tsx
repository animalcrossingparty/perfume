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
  location: any;
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

  componentDidUpdate(prevProps) {
    let oldId = prevProps.location.key;
    let newId = this.props.location.key;
    if (newId !== oldId) {
      console.log("update!!!!!!!!!!!!!!!!!!!!!");
      this.initializeDetailInfo();
      window.scrollTo(0, 0);
    }
  }
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
          <section className="detail-top-divide">
            <div className="perfume-info-image center">
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
            </div>
            <section className="perfume-info-text">
              <div className="detail-info-text-header">
                <div className="detail-info-header-text">
                  <p className="ml-3 right" style={{ color: "#f3f3f3" }}>
                    {detail.id}
                  </p>
                  <p
                    style={{
                      color: "#c3c3c3",
                      fontSize: "1.56vw",
                      fontWeight: 400,
                      letterSpacing: "0.1vw",
                    }}
                  >
                    {detail.brand.name}
                  </p>
                  <h4
                    style={{
                      lineHeight: "1.86vw",
                      fontSize: "1.86vw",
                      height: "1.86vw",
                      overflowY: "hidden",
                    }}
                    className="mt-1"
                  >
                    {" "}
                    {detail.name}{" "}
                    <span
                      style={{
                        background: "#e0e0e0",
                        borderRadius: "15px",
                        fontSize: "1vw",
                        padding: "2px",
                      }}
                    >
                      {" "}
                      {detail.launch_date
                        ? detail.launch_date.substr(0, 4)
                        : `(정보없음)`}{" "}
                    </span>{" "}
                  </h4>
                  <h5 className="perfume_brand">
                    <small className="detail_price">
                      {detail.price
                        ? "₩ " + this.makeComma(detail.price.toFixed(0))
                        : "가격 정보가 없습니다"}
                    </small>
                  </h5>
                  <section className="categories-row m-0 center">
                    <span
                      style={{
                        color: "#4f4f4f",
                        background: "none",
                        borderRight: "1px solid #e0e0e0",
                      }}
                    >
                      CATEGORY
                    </span>
                    {detail.categories.map((cat) => (
                      <span key={"d-category-" + cat.id}>{cat.name}</span>
                    ))}
                  </section>
                </div>
                <div className="rate-wrapper">
                  <div className="rate-inside-circle">
                    <h5>
                      <Icon>grade</Icon>
                      {detail.avg_rate.toFixed(2)}
                    </h5>

                  </div>
                  <Circle
                    className="rate-circle"
                    percent={this.state.progress}
                    strokeWidth={4}
                    strokeColor={"lightpink"}
                    trailColor={"lightgray"}
                  />
                </div>
              </div>

              <section className="note-and-rate-row center">
                <span>TOP NOTES</span>
                <div className="note-tags">
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
                </div>
                <span>HEART NOTES</span>
                <div className="note-tags">
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
                </div>
                <span>BASE NOTES</span>
                <div className="note-tags">
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
                </div>
              </section>
              <h6
                className="thin center"
                style={{
                  backgroundColor: "#4f4f4f",
                  color: "white",
                  padding: "10px 0",
                }}
              >
                {detail.name}과 비슷한 향수들
              </h6>
              <section className="similar-container">
                {detail.similar && detail.similar.length > 3 ? (
                  detail.similar
                    .substr(1, detail.similar.length - 2)
                    .split(", ")
                    .map((sim, rank) => (
                      <Link
                        to={{ pathname: `/detail/${sim}` }}
                        className="each-similar"
                        key={sim + "th"}
                        style={{
                          backgroundImage: `url(http://i02b208.p.ssafy.io:8000/staticfiles/images/${sim}.jpg)`,
                        }}
                      ></Link>
                    ))
                ) : (
                  <div>비슷한 향수 데이터가 없습니다.</div>
                )}
              </section>
            </section>
          </section>
        </section>

        <h5 className="thin center">
          {detail.name}을 좋아하는 유저가 선택한 향수들
        </h5>
        <section className="similar-container">
          {detail.recommended && detail.recommended.length > 3 ? (
            detail.recommended
              .substr(1, detail.recommended.length - 2)
              .split(", ")
              .map((sim, rank) => (
                <Link
                  to={{ pathname: `/detail/${sim}` }}
                  className="each-similar"
                  key={sim + "th"}
                  style={{
                    backgroundImage: `url(http://i02b208.p.ssafy.io:8000/staticfiles/images/${sim}.jpg)`,
                  }}
                ></Link>
              ))
          ) : (
            <div>추천 향수 데이터가 없습니다.</div>
          )}
        </section>
        <div className="review-list-header">
          {detail.reviews
            ? `Reviews (${detail.reviews.length})`
            : "여러분의 소중한 리뷰를 남겨주세요"}
        </div>
        <h5
          className="thin center"
          style={{ background: "#4f4f4f", color: "white" }}
        >
          {detail.name} - 리뷰 키워드 WORD CLOUD
        </h5>
        <section style={{ padding: "5%" }}>
          <img
            src={`http://i02b208.p.ssafy.io:8000/staticfiles/wordcloud/${detail.id}-wc.webp`}
            width="100%"
            height="700px"
            alt=""
          />
        </section>
        <section className="review-write-box">
          {this.props.user.get("logged") ? (
            <ReviewTextBox id={detail.id} />
          ) : (
            <h4>로그인해서 댓글작성</h4>
          )}
        </section>
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
