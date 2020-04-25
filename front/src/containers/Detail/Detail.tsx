import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as detailActions from "redux/modules/detail";
import { Icon, Row, Col } from "react-materialize";
import { Circle } from "rc-progress";

import { Carousel, ReviewTextBox } from "components/";
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
    interval: setInterval(()=>1, 5000)
  };
  addOne = () => {
    if (this.state.progress < this.props.detail.avg_rate.toFixed(1) * 10) {
      this.state.accel > 1 ? this.setState({ accel: this.state.accel - 5 }) : this.setState({ accel: 10 })
      this.setState({ progress: this.state.progress + 1 });
    } else {
      clearInterval(this.state.interval)
    }
  }
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
              <img src={detail.thumbnail} alt="" />
            </Col>
            <Col s={6} className="perfume-info-text">
              <p>
                <Icon className="mr-1">today</Icon>
                {detail.launch_date.substr(0, 4)}년 출시
              </p>
              <small className="right">{detail.id}</small>
              <h4 className="mt-1"> {detail.name} </h4>
              <h5 className="perfume_brand">
                <Icon>store_mall_directory</Icon>{" "}
                <small className="mr-3">made by</small>
                {detail.brand.name}{" "}
              </h5>
              <Row>
                <Col s={6}>
                  <h6>탑 노트</h6>
                  <h6>하트 노트</h6>
                  <h6>베이스 노트</h6>
                </Col>
                <Col s={6}>
                  <div className="wrapper">
                    <div className="rate-inside-circle">{detail.avg_rate.toFixed(1)}</div>
                    <Circle
                      className="rate-circle"
                      percent={this.state.progress}
                      strokeWidth={9}
                      strokeColor={"lightblue"}
                      trailColor={"gray"}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>
        <div className="detail_box">
          <div className="perfume_info">
            <div className="perfume_name">
            </div>

            <div className="star_rating">
              <div className="average">4.0</div>
            </div>

            <div className="contexts">
              <div className="context gender">
                <i>Preferred Gender</i>
                <br />
                <img
                  src="https://user-images.githubusercontent.com/52684457/78762652-18cca280-79bf-11ea-963b-9e152f6224a2.png"
                  alt=""
                />
                <img
                  src="https://user-images.githubusercontent.com/52684457/78762655-19fdcf80-79bf-11ea-8162-fdd887cfd192.png"
                  alt=""
                />
              </div>
              <div className="context">
                <i>Category</i>
                <div className="category">
                  Woody <br />
                  Floral
                </div>
              </div>
              <div className="context">
                <i>Availablity</i>
                <div className="availablity">Available</div>
              </div>
            </div>
          </div>
        </div>


        <div className="carousel_br"></div>
        <div className="recommend_list">The Other Perfumes</div>
        <div className="carousel_list">
          <Carousel />
        </div>

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
