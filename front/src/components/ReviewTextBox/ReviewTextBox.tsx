import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Button, Row } from "react-materialize";
import { bindActionCreators } from "redux";
import * as reviewActions from "redux/modules/review";
import BeautyStars from "beauty-stars";

interface ReviewTextBoxProps {
  ReviewActions: any;
  form: any;
  id: number;
  token: string;
}

class ReviewTextBox extends Component<ReviewTextBoxProps> {
  state = {
    size: "25px",
    gap: "8px",
    inactiveColor: "rgba(110, 100, 64, 0.2)",
    activeColor: "rgb(247, 214, 138)",
  };
  handleChange = (e) => {
    const { ReviewActions } = this.props;
    const { value, name } = e.target;
    ReviewActions.changeInput({
      name,
      value,
      form: "form",
    });
  };
  handleRate = (rate) => {
    const { ReviewActions } = this.props;
    const name = "rate";
    const value = rate;
    ReviewActions.changeInput({
      name,
      value,
      form: "form",
    });
  };
  handlePosting = async () => {
    const { form, ReviewActions, id, token } = this.props;
    const { content, rate } = form.toJS();
    try {
      await ReviewActions.postReview(content, rate, id, token).then((r) => {
        alert("리뷰가 등록되었습니다");
        this.forceUpdate();
      });
    } catch (e) {
      alert(e);
    }
  };

  render() {
    const { content, rate } = this.props.form.toJS();
    return (
      <div className="write_comment shadow-2">
        <div className="row_comment">
          <textarea
            name="content"
            id="review-content-text"
            cols={30}
            placeholder="당신의 소중한 리뷰를 남겨주세요"
            rows={20}
            onChange={this.handleChange}
            value={content}
          />
        </div>
        <Row style={{ justifyContent: "flex-end" }} className="StarRating">
          <small className="mr-4">이 향수는 몇 점이었나요?</small>
          <BeautyStars
            value={rate}
            size={this.state.size}
            gap={this.state.gap}
            maxStars={10}
            inactiveColor={this.state.inactiveColor}
            activeColor={this.state.activeColor}
            onChange={this.handleRate}
          />
          <Button
            style={{
              backgroundColor: "#3f0000",
              borderRadius: "10px",
              marginLeft: "32px",
            }}
            node="button"
            waves="light"
            onClick={this.handlePosting}
          >
            <Icon>chat</Icon>
          </Button>
        </Row>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    form: state.review.get("form"),
    token: state.user.getIn(["loggedInfo", "token"]),
  }),
  (dispatch) => ({
    ReviewActions: bindActionCreators(reviewActions, dispatch),
  })
)(ReviewTextBox);
