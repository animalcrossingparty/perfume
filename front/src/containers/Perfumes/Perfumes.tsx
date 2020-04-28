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
  Collapsible,
  CollapsibleItem,
  ProgressBar,
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
    console.log(selectedPage);
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
      page,
    } = queryString.parse(window.location.search);
    return (
      <section style={{ height: window.innerHeight - 64 }}>
        <Row className="perfume-list-subheader mb-0">
          <Col></Col>
          <Col className="sort-row"></Col>
        </Row>

        <Row
          className="perfume-list-container"
          style={{ height: window.innerHeight - 180 }}
        >
          <Col s={2} className="perfume-sidenav">
            <h4 className="m-2 thin">MENUS</h4>
            <Collapsible accordion={false}>
              <CollapsibleItem
                expanded={true}
                header="ORDER BY"
                icon={null}
                node="div"
              >
                <Row className="mb-0">
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
                </Row>
                <Row className="mb-0">
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
                </Row>
                <Row className="mb-0">
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
                </Row>
                <Row className="mb-0">
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
                </Row>
                <Row className="mb-0">
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
                </Row>
              </CollapsibleItem>
              <CollapsibleItem
                expanded={true}
                header="COLLECTIONS"
                icon={null}
                node="div"
              >
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
              </CollapsibleItem>
              <CollapsibleItem
                expanded={true}
                header="BRANDS"
                icon={null}
                node="div"
              >
                You know, FYI, you can buy a paddle. Did you not plan for this
                contingency?
              </CollapsibleItem>
            </Collapsible>
          </Col>
          <Col s={9}>
            <Row>
              <h4 className="m-1 thin">PERFUMES</h4>
              <Pagination
                activePage={Number(page)}
                activeClass="active-page-now"
                itemsCountPerPage={12}
                totalItemsCount={12 * this.props.num_pages}
                pageRangeDisplayed={12}
                onChange={this.handlePage}
              />
            </Row>

            {GET_PERFUME_INFO !== true
              ? perfumes.map((perfume) => (
                  <Col s={10} m={6} l={3} key={perfume.id}>
                    <Cards field={perfume} />
                  </Col>
                ))
              : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((pp) => (
                  <Col s={10} m={6} l={3} key={pp + "loader"}>
                    <div
                      className="card"
                      style={{ border: "1px solid lightgray", height: "375px" }}
                    >
                      <div
                        className="card-image"
                        style={{
                          height: "220px",
                          textAlign: "center",
                          lineHeight: "200px",
                          borderBottom: "1px solid lightgray",
                          background: "#f0f0f0",
                        }}
                      >
                        <Preloader
                          active
                          color="green"
                          flashing={true}
                          size="big"
                        />
                      </div>
                      <ProgressBar />
                    </div>
                  </Col>
                ))}
          </Col>
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
