import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as detailActions from 'redux/modules/detail';
import { Icon } from 'react-materialize'
import queryString from 'query-string'
import { Star, Carousel, StarRating } from 'components/'
import { Button } from 'react-materialize';
import { withRouter } from 'react-router'
import '../../css/DetailPage.css'

interface DetailProps {
  history: any,
  DetailActions: any,
  info: {
    pk: number,
    model: string,
    fields: any
  }
}

class Detail extends Component<DetailProps> {

  static defaultProps ={
    info: {
      pk: 1,
      model: '1',
      fields: {
          name: '이름 모를 향수',
          launch_date: "1949-01-01",
          thumbnail: "http://www.basenotes.net/images/design2013/bigs.png",
          gender: 0,
          availibility: 0,
          brand_id: 749,
          top_notes: [
            480,
            224
          ],
          heart_notes: [
            259,
            510,
            785,
            224
          ],
          base_notes: [
            28,
            624
          ]
      }
    }
  }
  initializeDetailInfo = async () => {
    const { DetailActions } = this.props
    const perfume_id = this.props.history.location.pathname.split('/')[2]
    await DetailActions.getPerfumeDetail(perfume_id);
  }

  componentWillMount() {
    this.initializeDetailInfo()
  }

  render() {
    return (
    <div className="center detail_center">
    <div className="detail_box">
      {/* 향수 div의 왼쪽 (향수 이름, 사진) */}
      <div className="left_box">

        {/* Name */}
        <div className="perfume_brand">
          PERFUME_BRAND
        </div>
        {/* Thumbnail */}
        <img src="https://user-images.githubusercontent.com/52684457/78694484-ac5a9080-7937-11ea-9c29-02498857c774.png"
          alt="" />

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
          {this.props.info.pk} / {this.props.info.fields.launch_date}
        </div>
        <div className="perfume_name">
          {this.props.info.fields.name}
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
          <Star />
          <div className="average">4.0</div>
        </div>

        {/* 향수 정보 */}
        <div className="contexts">
          <div className="context gender">
            <i>Preferred Gender</i><br />
            <img
              src="https://user-images.githubusercontent.com/52684457/78762652-18cca280-79bf-11ea-963b-9e152f6224a2.png"
              alt="" />
            <img
              src="https://user-images.githubusercontent.com/52684457/78762655-19fdcf80-79bf-11ea-8162-fdd887cfd192.png"
              alt="" />
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
            <div className="availablity">
              Available
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* notes */}
    <div className="notes_box">
      <div className="title_box">
        <div className="note_title">
          NOTES
        </div>
      </div>

      <div className="notes">
        <div className="note">
          <div className="top">
            <b>TOP</b><br />
            <div className="note_info">
              juiper, ciamo leaf
            </div>
          </div>
          <div className="heart">
            <b>HEART</b><br />
            <div className="note_info">
              coriader, laurel, rose, ciamo
            </div>
          </div>
          <div className="base">
            <b>BASE</b><br />
            <div className="note_info">
              ambergris, musk
            </div>
          </div>
        </div>

        <div className="note_img">
          <img
            src="https://user-images.githubusercontent.com/52684457/78767269-559b9800-79c5-11ea-9726-ce3d009afc30.png"
            alt="" />
        </div>
      </div>
    </div>

    {/* Carousel */}
    <div className="carousel_br"></div>
    <div className="recommend_list">
      The Other Perfumes
    </div>
    <div className="carousel_list">
      <Carousel />
    </div>

    {/* Reviews */}
    <div className="review_box">
      <div className="review_title">
        Reviews
      </div>

      <div className="write_comment">
        <div className="row_comment">
          <Icon>chat</Icon>
          {/* <Icon>person</Icon> */}
          <textarea name="review" id="review" />
          </div>
        <div className="StarRating">
          <StarRating />
          <Button
            node="button"
            waves="light">
            SUBMIT
          </Button>
        </div>
      </div>
      
    </div>

    </div>
    )
      }
    }
export default withRouter(connect(
  (state) => ({
    info: state.detail.getIn(['detail', 0])
  }),
  (dispatch) => ({
    DetailActions: bindActionCreators(detailActions, dispatch)
  })
)(Detail));