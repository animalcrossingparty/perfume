import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as perfumeActions from "redux/modules/perfume";
import { Cards } from "components/";
import { NavLink, Link } from "react-router-dom";
import {
  Row,
  Col,
  Icon,
  Preloader,
  RadioGroup,
  Collapsible,
  CollapsibleItem,
  ProgressBar,
  Checkbox,
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
  state = {
    categories: [
      { id: '1', label: "시트러스", value: '1', checked: false },
      { id: '2', label: "프루티", value: '2', checked: false },
      { id: '3', label: "플로럴", value: '3', checked: false },
      { id: '4', label: "White플로럴", value: '4', checked: false },
      { id: '5', label: "그린, 허브", value: '5', checked: false },
      { id: '6', label: "스파이시", value: '6', checked: false },
      { id: '7', label: "스위츠", value: '7', checked: false },
      { id: '8', label: "우디", value: '8', checked: false },
      { id: '9', label: "발삼", value: '9', checked: false },
      { id: '10', label: "머스트", value: '10', checked: false },
      { id: '11', label: "음료", value: '11', checked: false },
      { id: '12', label: "알데하이드", value: '12', checked: false },
    ],
  };
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
  handleCategory = (e) => {
    const {id, value } = e.target
    const { history, PerfumeActions } = this.props;
    const {categories} = this.state
    const queryParams = queryString.parse(history.location.search);
    const changedCategory = {id, value, label: this.state.categories[id-1].label, checked: !this.state.categories[id-1].checked}
    this.setState({
      categories: categories.map(
        cat => id === cat.id
          ? { ...cat, ...changedCategory }
          : cat
      )
    })
    let sc:any = []
    for (let i=0;i<12;i++){
      if
      (this.state.categories[i].checked) {
        sc.push(Number(this.state.categories[i].value))
      }
    }
    queryParams.category = sc.join(",");
    console.log(sc.join(','));
    
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
        <Row className="perfume-list-subheader mb-0" />
        <Row className="perfume-list-container" style={{ height: "100%" }}>
          <Col s={2} className="perfume-sidenav">
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
                <div>
                  <div
                    style={{
                      borderBottom: "1px solid #e0e0e0",
                      marginBottom: "15px",
                    }}
                  >
                    GENDER
                  </div>
                  <RadioGroup
                    label=""
                    name="gender"
                    options={[
                      { label: "공용", value: "all" },
                      { label: "남성용", value: "0" },
                      { label: "여성용", value: "1" },
                    ]}
                    value={gender}
                    onChange={({ target: { value } }) =>
                      this.handleGender(value)
                    }
                  />
                </div>
                <div
                  style={{
                    borderBottom: "1px solid #e0e0e0",
                    margin: "25px 0",
                  }}
                >
                  CATEGORY
                </div>
                <Row>
                  {this.state.categories.map((category) => {
                    return <Checkbox onChange={this.handleCategory} key={category.id + 'ckbx'} {...category} />;
                  })}
                </Row>
              </CollapsibleItem>
              <CollapsibleItem
                expanded={true}
                header="BRANDS"
                icon={null}
                node="div"
              >
                (구현중)
              </CollapsibleItem>
            </Collapsible>
          </Col>
          <Col s={9}>
            <div
              style={{
                position: "fixed",
                zIndex: 9,
                background: "white",
                width: "65%",
              }}
            >
              <Row>
                <p
                  style={{ backgroundColor: "#e0e0e0", letterSpacing: 3 }}
                  className="m-1 ml-4 thin row p-1"
                >
                  <Icon className="mr-3">info</Icon>맞춤 향수를 찾으실 때는 -{" "}
                  <Link style={{ color: "magenta" }} to="/surveyintro">
                    SURVEY
                  </Link>
                  -를 이용해보세요
                </p>
              </Row>
              <Row
                style={{
                  borderBottom: "1px solid #e0e0e0",
                  marginLeft: "1rem",
                }}
              >
                총 {this.props.num_pages} 페이지 중 {page} 페이지 | 검색 된
                향수: {this.props.num_pages * 12}개{" "}
                <Pagination
                  activePage={Number(page)}
                  activeClass="active-page-now"
                  itemsCountPerPage={12}
                  totalItemsCount={12 * this.props.num_pages}
                  pageRangeDisplayed={15}
                  onChange={this.handlePage}
                />
              </Row>
            </div>
            <div style={{ marginTop: "167.5px" }}>
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
                        style={{
                          border: "1px solid lightgray",
                          height: "434.72px",
                        }}
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
            </div>
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
