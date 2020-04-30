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
  category: any;
  fbrand: any;
  location: any;
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
    let oldId = prevProps.history.location.key;
    let newId = this.props.history.location.key;
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
    const id = e.target.id;
    const { history, PerfumeActions, category } = this.props;
    const queryParams = queryString.parse(history.location.search);
    let sc: Array<any> = [];
    category.map((cat) => {
      if (cat.id === id) {
        cat.checked = !cat.checked;
      }
      if (cat.checked) {
        sc.push(cat.id);
      }
      return 1
    });
    PerfumeActions.setCartSelect(category);
    queryParams.category = sc.join(",");
    window.history.pushState(
      "",
      "",
      `/perfume?${queryString.stringify(queryParams)}`
    );
    PerfumeActions.getPerfumeInfo(queryParams);
  };
  handleBrand = (e) => {
    const { history, PerfumeActions } = this.props;
    const queryParams = queryString.parse(history.location.search);
    queryParams.brand = e.target.value;
    PerfumeActions.getPerfumeInfo(queryParams);
    window.history.pushState(
      "",
      "",
      `/perfume?${queryString.stringify(queryParams)}`
    );
  }
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
      <section style={{ height: window.innerHeight - 64, backgroundColor: '#EFF5FB' }}>
        <Row className="perfume-list-container" style={{ height: "100%", marginTop: '64px' }}>
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
                <div className="pr-3">
                  <div
                    style={{
                      borderBottom: "1px solid #e0e0e0",
                      marginBottom: "25px",
                      marginTop: 25
                    }}
                  >
                    GENDER
                  </div>
                  <RadioGroup
                    label=""
                    name="gender"
                    options={[
                      { label: "Shared", value: "all" },
                      { label: "Male", value: "0" },
                      { label: "Female", value: "1" },
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
                    padding: '5%'
                  }}
                >
                  CATEGORY
                </div>
                <Row className="pl-2">
                  {this.props.category.map((cat) => {
                    return (
                      <Checkbox
                        onChange={this.handleCategory}
                        key={cat.id + "ckbx"}
                        {...cat}
                      />
                    );
                  })}
                </Row>
              </CollapsibleItem>
              <CollapsibleItem
                expanded={true}
                header="BRANDS"
                icon={null}
                node="div"
              >
                <div style={{height: '5vw'}}>
                  
                  <Select
                    multiple={false}
                    onChange={this.handleBrand}
                    options={{
                      classes: "",
                      dropdownOptions: {
                        alignment: "right",
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
                    <option value="all">
                    ALL
                    </option>
                    {
                      this.props.fbrand.map((br) => (<option key={br.id + 'key'} value={br.id}>{br.name}</option>))
                    }
                  </Select>
                </div>
              </CollapsibleItem>
            </Collapsible>
          </Col>
          <Col s={9}>
            <div
              style={{
                position: "fixed",
                zIndex: 3,
                background: "#CECEF6",
                width: "100%",
                paddingTop: "10px",
                marginLeft: "11.25px",
                border: "1px solid #e0e0e0",
              }}
            >
              <Row style={{}}>
                <p
                  style={{ backgroundColor: "#F8EFFB",fontWeight: 700,color: '#3f3f3f', letterSpacing: 3, width: '100%', padding: '28px 12px' }}
                  className="m-1 ml-4 thin row p-1"
                >
                  <Icon style={{color: '#fff'}} className="mr-3">info</Icon>맞춤 향수를 찾으실 때는 -{" "}
                  <Link style={{ color: "plum", fontWeight: 700 }} to="/surveyintro">
                    SURVEY
                  </Link>
                  -를 이용해보세요
                </p>
              </Row>
              <Row
                style={{
                  margin: "8px 0",
                  padding: "0 24px",
                  background: "#F8EFFB",
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
            <div style={{ marginTop: "14%" }}>
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
                          height: "437px",
                        }}
                      >
                        <div
                          className="card-image"
                          style={{
                            textAlign: "center",
                            lineHeight: "232px",
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
    category: state.perfume.get("category"),
    fbrand: state.perfume.get("fbrand"),
  }),
  (dispatch) => ({
    PerfumeActions: bindActionCreators(perfumeActions, dispatch),
  })
)(Perfumes);
