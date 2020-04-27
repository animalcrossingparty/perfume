import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as perfumeActions from "redux/modules/perfume";
import { Cards } from "components/";
import { NavLink } from "react-router-dom";
import {
  Row,
  Col,
  Pagination,
  Icon,
  Preloader,
  RadioGroup,
} from "react-materialize";
import queryString from "query-string";

interface PerfumeProps {
  PerfumeActions: any;
  num_pages: number;
  perfumes: any;
  history: any;
  pender: any;
}

class Perfumes extends Component<PerfumeProps> {
  initializePerfumeInfo = async () => {
    const { PerfumeActions, history } = this.props;
    const queryParams = queryString.parse(history.location.search);
    await PerfumeActions.getPerfumeInfo(queryParams);
  };

  componentDidMount() {
    this.initializePerfumeInfo();
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.history.location.search;
    let newId = this.props.history.location.search;
    if (newId !== oldId) {
      this.initializePerfumeInfo();
    }
  }

  handlePage = (selectedPage) => {
    const { history, PerfumeActions } = this.props;
    const queryParams = queryString.parse(history.location.search);
    queryParams.page = selectedPage;
    PerfumeActions.getPerfumeInfo(queryParams);
  };
  handleGender = (selectedGender) => {
    const { history, PerfumeActions } = this.props;
    const queryParams = queryString.parse(history.location.search);
    queryParams.gender = selectedGender;
    window.history.pushState(
      "",
      "",
      `/perfume?${queryString.stringify(queryParams)}`
    );
    PerfumeActions.getPerfumeInfo(queryParams);
  };
  render() {
    const { perfumes } = this.props;
    const { GET_PERFUME_INFO } = this.props.pender;
    const {
      page,
      sort,
      brand,
      category,
      exclude,
      include,
      gender,
    } = queryString.parse(window.location.search);
    return (
      <div className="cards_box">
        <div className="radio-search">
          <div className="radio-search-box">
            <Row className="row-margin">
              <Col>
                <RadioGroup
                  label=""
                  name="gender"
                  options={[
                    { label: "모두", value: "all" },
                    { label: "남성용", value: "0" },
                    { label: "여성용", value: "1" },
                    { label: "공용", value: "2" },
                  ]}
                  value={gender}
                  onChange={({ target: { value } }) => this.handleGender(value)}
                  withGap
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {sort !== "alpha" ? (
                  <NavLink
                    to={`/perfume?page=1&sort=alpha&brand=${brand}&category=${category}&exclude=${exclude}&include=${include}&gender=${gender}`}
                  >
                    사전순
                  </NavLink>
                ) : (
                  <NavLink to="#" className="disabled-link">
                    사전순
                  </NavLink>
                )}
              </Col>
              <Col>
                {sort !== "rate" ? (
                  <NavLink
                    to={`/perfume?page=1&sort=rate&brand=${brand}&category=${category}&exclude=${exclude}&include=${include}&gender=${gender}`}
                  >
                    평점순
                  </NavLink>
                ) : (
                  <NavLink to="#" className="disabled-link">
                    평점순
                  </NavLink>
                )}
              </Col>
              <Col>
                {sort !== "reviewcnt" ? (
                  <NavLink
                    to={`/perfume?page=1&sort=reviewcnt&brand=${brand}&category=${category}&exclude=${exclude}&include=${include}&gender=${gender}`}
                  >
                    리뷰순
                  </NavLink>
                ) : (
                  <NavLink to="#" className="disabled-link">
                    리뷰순
                  </NavLink>
                )}
              </Col>
            </Row>
          </div>
        </div>
        <div className="perfume-topheader">
          <div className="pagenation-container">
            <Pagination
              activePage={Number(page)}
              items={this.props.num_pages < 20 ? this.props.num_pages : 20}
              leftBtn={<Icon>chevron_left</Icon>}
              rightBtn={<Icon>chevron_right</Icon>}
              onSelect={this.handlePage}
              maxButtons={10}
            />
          </div>
        </div>
        <Row className="wrap">
          {GET_PERFUME_INFO !== true ? (
            perfumes.map((perfume) => (
              <Col s={12} m={6} l={4} xl={3} key={perfume.id}>
                <Cards field={perfume} />
              </Col>
            ))
          ) : (
            <Col s={12}>
              <h1 className="m-0 p-0 loading-message">향수 정보를 가져오는 중입니다,,,</h1>
              <Col s={12} className="circle-loader-wrap">
                <Preloader active color="green" flashing={true} size="big" />
              </Col>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    perfumes: state.perfume.get("perfumesList"),
    num_pages: state.perfume.get("num_pages"),
    pender: state.pender.pending,
  }),
  (dispatch) => ({
    PerfumeActions: bindActionCreators(perfumeActions, dispatch),
  })
)(Perfumes);
