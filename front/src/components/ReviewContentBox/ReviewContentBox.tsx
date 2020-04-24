import React, { Component } from "react";
import { connect } from "react-redux";
import * as detailActions from "redux/modules/detail";
import { Icon, Button } from "react-materialize";


interface SingleReviewProps {
  review: any
}

class ReviewContentBox extends Component<SingleReviewProps> {
  render() {
    return (
      <div className="comment_list">
        <div className="comment_user">
          <div className="user_review_name">
            <div className="bedge">
              <img
                src="https://user-images.githubusercontent.com/52684457/79992607-adbaba00-84ee-11ea-98c4-5f844400a294.png"
                alt=""
              />
              <div className="top_bedge">Angelo Orazio Pregoni</div>
            </div>
          </div>
          <div className="review_text"></div>
        </div>
        <div className="review_star">
          <div className="review_date">27th May, 2015</div>
        </div>
        <div className="btn_comment_list">
          <Button>
            <Icon>delete</Icon>
          </Button>
          <Button>
            <Icon>edit</Icon>
          </Button>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    review: state.detail
  }),
  (dispatch) => ({
  })
)(ReviewContentBox);
