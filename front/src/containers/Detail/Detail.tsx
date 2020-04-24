import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as detailActions from "redux/modules/detail";
import { Icon } from "react-materialize";

import { Carousel, ReviewTextBox } from "components/";
import { withRouter } from "react-router";
import "../../css/DetailPage.css";

interface DetailProps {
  history: any;
  DetailActions: any;
  detail: any;
}

class Detail extends Component<DetailProps> {
  initializeDetailInfo = async () => {
    const { DetailActions, history } = this.props;
    const perfume_id = history.location.pathname.split("/")[2];
    await DetailActions.getPerfumeDetail(perfume_id);
  };

  componentWillMount() {
    this.initializeDetailInfo();
  }

  render() {
    const { detail } = this.props
    return (
      <div className="center detail_center">
        <div className="detail_box">
          {/* 향수 div의 왼쪽 (향수 이름, 사진) */}
          <div className="left_box">
            {/* Name */}
    <div className="perfume_brand">{detail.brand.name}</div>
            {/* Thumbnail */}
            <img
              src={detail.thumbnail}
              alt=""
            />

            {/* Favorite */}
            <div className="like">
              <Icon>favorite</Icon>
              {/* <Icon>favorite_border</Icon> */}
            </div>
          </div>

          {/* 향수 정보 */}
          <div className="perfume_info">
            {/* PerfumeId & Year */}
            <div className="perfume_id">
              {detail.id} / {detail.launch_date}
            </div>
            <div className="perfume_name">
              {detail.name}
              {/* <div className="gender">
            <img
              src="https://user-images.githubusercontent.com/52684457/78762652-18cca280-79bf-11ea-963b-9e152f6224a2.png"
              alt="" />
            <img
              src="https://user-images.githubusercontent.com/52684457/78762655-19fdcf80-79bf-11ea-8162-fdd887cfd192.png"
              alt="" />
          </div> */}
            </div>

            {/* star rating */}
            <div className="star_rating">
              <div className="average">4.0</div>
            </div>

            {/* 향수 정보 */}
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

        {/* notes */}
        <div className="notes_box">
          <div className="title_box">
            <div className="note_title">NOTES</div>
          </div>

          <div className="notes">
            <div className="note">
              <div className="top">
                <b>TOP</b>
                <br />
                <div className="note_info">juiper, ciamo leaf</div>
              </div>
              <div className="heart">
                <b>HEART</b>
                <br />
                <div className="note_info">coriader, laurel, rose, ciamo</div>
              </div>
              <div className="base">
                <b>BASE</b>
                <br />
                <div className="note_info">ambergris, musk</div>
              </div>
            </div>

            <div className="note_img">
              <img
                src="https://user-images.githubusercontent.com/52684457/78767269-559b9800-79c5-11ea-9726-ce3d009afc30.png"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="carousel_br"></div>
        <div className="recommend_list">The Other Perfumes</div>
        <div className="carousel_list">
          <Carousel />
        </div>

        {/* Reviews */}
        <div className="review_box">
          <div className="review_title">Reviews</div>
          <ReviewTextBox id={26148987} />

        </div>
      </div>
    );
  }
}
export default withRouter(
  connect(
    (state) => ({
      detail: state.detail.get('detail')
    }),
    (dispatch) => ({
      DetailActions: bindActionCreators(detailActions, dispatch),
    })
  )(Detail)
);
