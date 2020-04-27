import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as perfumeActions from "redux/modules/perfume";
import { Cards } from "components/";
import { NavLink } from "react-router-dom";
import {
  Row,
  Col,
  Icon,
  Preloader,
  RadioGroup,
  Select,
} from "react-materialize";
import queryString from "query-string";
import Pagination from "react-js-pagination";

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
    console.log(selectedPage)
    queryParams.page = selectedPage;
    PerfumeActions.getPerfumeInfo(queryParams);
    window.history.pushState(
      "",
      "",
      `/perfume?${queryString.stringify(queryParams)}`
    );
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
      sort,
      brand,
      category,
      exclude,
      include,
      gender,
      page
    } = queryString.parse(window.location.search);
    return (
      <section style={{ height: window.innerHeight - 64 }}>
        <Row className="perfume-list-subheader mb-0">
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
          <Col>
            <Pagination
              activePage={Number(page)}
              activeClass='active-page-now'
              itemsCountPerPage={12}
              totalItemsCount={12 * this.props.num_pages }
              pageRangeDisplayed={8}
              onChange={this.handlePage}
            />
          </Col>
          <Col className="sort-row">
            <Col>
              {sort !== "alpha" ? (
                <NavLink
                  to={`/perfume?page=1&sort=alpha&brand=${brand}&category=${category}&exclude=${exclude}&include=${include}&gender=${gender}`}
                >
                  <Icon tiny>sort_by_alpha</Icon>
                  <div>사전순</div>
                </NavLink>
              ) : (
                <NavLink to="#" className="disabled-link">
                  <Icon tiny>sort_by_alpha</Icon>
                  <div>사전순</div>
                </NavLink>
              )}
            </Col>
            <Col>
              {sort !== "rate" ? (
                <NavLink
                  to={`/perfume?page=1&sort=rate&brand=${brand}&category=${category}&exclude=${exclude}&include=${include}&gender=${gender}`}
                >
                  <Icon tiny>thumbs_up_down</Icon>
                  <div>평점순</div>
                </NavLink>
              ) : (
                <NavLink to="#" className="disabled-link">
                  <Icon tiny>thumbs_up_down</Icon>
                  <div>평점순</div>
                </NavLink>
              )}
            </Col>
            <Col>
              {sort !== "reviewcnt" ? (
                <NavLink
                  to={`/perfume?page=1&sort=reviewcnt&brand=${brand}&category=${category}&exclude=${exclude}&include=${include}&gender=${gender}`}
                >
                  <Icon tiny>rate_review</Icon>
                  <div>리뷰순</div>
                </NavLink>
              ) : (
                <NavLink to="#" className="disabled-link">
                  <Icon tiny>rate_review</Icon>
                  <div>리뷰순</div>
                </NavLink>
              )}
            </Col>
            <Col>
              {sort !== "expensive" ? (
                <NavLink
                  to={`/perfume?page=1&sort=expensive&brand=${brand}&category=${category}&exclude=${exclude}&include=${include}&gender=${gender}`}
                >
                  <Icon tiny>monetization_on</Icon>
                  <div>높은 가격 순</div>
                </NavLink>
              ) : (
                <NavLink to="#" className="disabled-link">
                  <Icon tiny>monetization_on</Icon>
                  <div>높은 가격 순</div>
                </NavLink>
              )}
            </Col>
            <Col>
              {sort !== "cheap" ? (
                <NavLink
                  to={`/perfume?page=1&sort=cheap&brand=${brand}&category=${category}&exclude=${exclude}&include=${include}&gender=${gender}`}
                >
                  <Icon tiny>money</Icon>
                  <div>낮은 가격 순</div>
                </NavLink>
              ) : (
                <NavLink to="#" className="disabled-link">
                  <Icon tiny>money</Icon>
                  <div>낮은 가격 순</div>
                </NavLink>
              )}
            </Col>
          </Col>
        </Row>
        <Row className="perfume-list-subheader2">
          <Col s={4}>
            <Select
              id="Select-brand"
              multiple={false}
              onChange={function noRefCheck() {}}
              className="w-100"
              options={{
                classes: "",
                dropdownOptions: {
                  alignment: "left",
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: true,
                  coverTrigger: true,
                  hover: false,
                  inDuration: 150,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  outDuration: 250,
                },
              }}
              value=""
            >
              <option disabled value="">
                가격대로 찾기
              </option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </Select>
          </Col>
          <Col s={4}>
            <Select
              id="Select-brand"
              multiple={false}
              onChange={function noRefCheck() {}}
              className="w-100"
              options={{
                classes: "",
                dropdownOptions: {
                  alignment: "left",
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: true,
                  coverTrigger: true,
                  hover: false,
                  inDuration: 150,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  outDuration: 250,
                },
              }}
              value=""
            >
              <option disabled value="">
                브랜드로 찾기
              </option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </Select>
          </Col>
          <Col s={4}>
            <Select
              id="Select-brand"
              multiple={false}
              onChange={function noRefCheck() {}}
              className="w-100"
              options={{
                classes: "",
                dropdownOptions: {
                  alignment: "left",
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: true,
                  coverTrigger: true,
                  hover: false,
                  inDuration: 150,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  outDuration: 250,
                },
              }}
              value=""
            >
              <option disabled value="">
                카테고리로 찾기
              </option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </Select>
          </Col>
        </Row>
        <Row
          className="container perfume-list-container"
          style={{ height: window.innerHeight - 180 }}
        >
          {GET_PERFUME_INFO !== true ? (
            perfumes.map((perfume) => (
              <Col s={12} m={6} l={4} key={perfume.id}>
                <Cards field={perfume} />
              </Col>
            ))
          ) : (
            <Col s={12}>
              <h1 className="m-0 p-0 loading-message">
                향수 정보를 가져오는 중입니다,,,
              </h1>
              <Col s={12} className="circle-loader-wrap">
                <Preloader active color="green" flashing={true} size="big" />
              </Col>
            </Col>
          )}
        </Row>
      </section>
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
