import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as detailActions from "redux/modules/detail";
import { Row, Col, Chip, Icon, Button, MediaBox } from "react-materialize";
import { Circle } from "rc-progress";
import springPIC from "assets/images/spring.jpg";
import summerPIC from "assets/images/summer.jpg";
import autumnPIC from "assets/images/autumn.jpg";
import winterPIC from "assets/images/winter.jpg";
import TopUser from "assets/badge/TopUser.png";
import User1 from "assets/badge/User1.png";
import User2 from "assets/badge/User2.png";
import User3 from "assets/badge/User3.png";
import User4 from "assets/badge/User4.png";
import { Link } from "react-router-dom";
import { ReviewTextBox } from "components/";
import { withRouter } from "react-router";
import BeautyStars from "beauty-stars";
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
    hashMap: {
      0: TopUser,
      2: User1,
      3: User2,
      4: User3,
      1: User4,
    },
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
      <div className="detailcont">
        <section className="tricol">
          <aside className="leftcol">
            <div>
              <h5 className="sub-title-col">카테고리</h5>
              <div className="categories-row">
                {detail.categories.map((cat) => (
                  <span key={"d-category-" + cat.id}>{cat.name}</span>
                ))}
              </div>
            </div>
            <div>
              <h5 className="sub-title-col">노트</h5>
              <div style={{ textAlign: "right" }}>
                <span className="pr-2">TOP NOTES</span>
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
                <span className="pr-2">HEART NOTES</span>
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
                <span className="pr-2">BASE NOTES</span>
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
              </div>
            </div>
          </aside>
          <aside className="centercol">
            <div
              className="detail-thumbnail"
              style={{ backgroundImage: `url(${detail.thumbnail})` }}
            />
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
          </aside>
          <aside className="rightcol">
            <div>
              <div className="detail-info-text-header">
                <div className="detail-info-header-text">
                  <p
                    style={{
                      color: "#4f4f4f",
                      fontSize: "1.4vw",
                      letterSpacing: "0.2vw",
                      margin: 0,
                    }}
                  >
                    {detail.brand.name}
                    <span
                      style={{
                        background: "#4f4f4f",
                        color: "#fff",
                        borderRadius: "4px",
                        textAlign: "center",
                        fontSize: "0.8vw",
                        padding: "4px 2px",
                        marginLeft: 12,
                      }}
                    >
                      {detail.launch_date
                        ? detail.launch_date.substr(0, 4)
                        : `(정보없음)`}
                    </span>
                  </p>
                  <h4
                    style={{
                      lineHeight: "2.2vw",
                      fontSize: "2.2vw",
                      height: "3vw",
                      overflowY: "hidden",
                    }}
                    className="my-1"
                  >
                    {detail.name}
                  </h4>
                  <h5 className="perfume_brand">
                    <small className="detail_price">
                      {detail.price
                        ? "₩ " + this.makeComma(detail.price.toFixed(0))
                        : "가격 정보가 없습니다"}
                    </small>
                  </h5>
                </div>
              </div>
            </div>
            <div>
              <h5 className="sub-title-col">평점</h5>
              <div className="rate-wrapper">
                <div className="rate-inside-circle">
                  <Icon className="mt-2">grade</Icon>
                  <span>{detail.avg_rate.toFixed(2)}</span>
                </div>
                <Circle
                  className="rate-circle"
                  percent={this.state.progress}
                  strokeWidth={8}
                  strokeColor={"#4f4f4f"}
                  trailColor={"lightgray"}
                />
              </div>
            </div>
            <div>
              <h5 className="sub-title-col">유사 향수 목록</h5>
              <section className="similar-container">
                {detail.similar && detail.similar.length > 0 ? (
                  detail.similar.map((sim, rank) => (
                    <Link
                      to={{ pathname: `/detail/${sim.id}` }}
                      className="each-similar"
                      key={sim.id + "th"}
                      style={{
                        backgroundImage: `url(http://i02b208.p.ssafy.io:8000/staticfiles/images/${sim.id}.jpg)`,
                      }}
                    >
                      <Button
                        node="div"
                        className="d-none"
                        tooltip={sim.name}
                        tooltipOptions={{
                          position: "bottom",
                        }}
                      ></Button>
                    </Link>
                  ))
                ) : (
                  <div>비슷한 향수 데이터가 없습니다.</div>
                )}
              </section>
            </div>
          </aside>
        </section>
        <section className="wc-row">
          <div className="wc-row-wrap">
            <MediaBox
              id="MediaBox_7"
              className='wc-box'
              options={{
                inDuration: 275,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 200,
              }}
            >
              <img
                src={`http://i02b208.p.ssafy.io:8000/staticfiles/wordcloud/${detail.id}-wc.webp`}
                width="400px"
                height="200px"
                alt=""
              />
            </MediaBox>
          </div>
          <div className="wc-row-recc">
            <h5 className="sub-title-col">평점 기반 추천 향수</h5>
            <section className="recom-container">
                {detail.recommended && detail.recommended.length > 0 ? (
                  detail.recommended.map((sim, rank) => (
                    <Link
                      to={{ pathname: `/detail/${sim.id}` }}
                      className="each-similar"
                      key={sim.id + "th"}
                      style={{
                        backgroundImage: `url(http://i02b208.p.ssafy.io:8000/staticfiles/images/${sim.id}.jpg)`,
                      }}
                    >
                      <Button
                        node="div"
                        className="d-none"
                        tooltip={sim.name}
                        tooltipOptions={{
                          position: "bottom",
                        }}
                      ></Button>
                    </Link>
                  ))
                ) : (
                  <div>추천 향수 데이터가 없습니다.</div>
                )}
              </section>

          </div>
        </section>

        <div className="review-list-header pt-5">
          {detail.reviews
            ? `(${detail.reviews.length})`
            : "여러분의 소중한 리뷰를 남겨주세요"}
        </div>

        <section className="review-write-box">
          {this.props.user.get("logged") ? (
            <ReviewTextBox id={detail.id} />
          ) : (
            <div className="plz-login">
              <Link to="/login" style={{ color: "#8e8e8e" }}>
                로그인 하러가기
              </Link>
            </div>
          )}
        </section>
        <section className="review-list-container">
          {detail.reviews ? (
            detail.reviews.map((review) => (
              <Row className="review-list-row" key={review.id + "-re"}>
                <div className="review-header">
                  <div
                    style={{
                      display: "flex",
                      marginLeft: 20,
                      alignItems: "center",
                    }}
                  >
                    <img
                      alt=""
                      className="rank-badge"
                      src={this.state.hashMap[review.user.charCodeAt(0) % 5]}
                    />
                    <p className="m-0 ml-2 username">{review.user}</p>
                    <p
                      className="ml-3"
                      style={{ fontSize: "11px", fontFamily: "Roboto" }}
                    >
                      At : {review.created_at.substr(0, 10)}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <BeautyStars
                      value={review.rate.toFixed(0)}
                      size="20px"
                      gap="8px"
                      maxStars={10}
                      inactiveColor="#e0e0e0"
                      activeColor="rgb(247, 214, 138)"
                      editable={false}
                    />
                    {}
                  </div>
                </div>

                <Col className="review-content">{review.content}</Col>
                <p
                  style={{
                    paddingLeft: 82,
                    backgroundColor: "#e0e0e0",
                    width: "100%",
                  }}
                ></p>
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
