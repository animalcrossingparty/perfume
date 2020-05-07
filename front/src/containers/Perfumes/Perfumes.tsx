import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as perfumeActions from "redux/modules/perfume";
import { Cards } from "components/";
import icon_l from 'assets/images/icon.png'
// import ban from 'assets/ban.webp'
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
  Checkbox,
  Select,
  Autocomplete,
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
  initializeSearchInfo = async (e) => {
    e.preventDefault();
    const { PerfumeActions, history } = this.props;
    let rawq = e.target.querySelector("input").value.split(" ");
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
    let result = [] as any[];
    rawq.map((r) => {
      console.log(r);
      if (regExp.test(r)) {
        let t = r.replace(regExp, "");
        result.push(t);
      } else {
        result.push(r);
      }
    });
    await PerfumeActions.searchInfo(result.join(","));
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
      return 1;
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
  };
  render() {
    const { perfumes } = this.props;
    const perfumeLoading = this.props.pender.GET_PERFUME_INFO;
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
      <section style={{ backgroundColor: "#fff", fontFamily: 'S-CoreDream-3Light' }}>
        <section
          className="perfume-list-container"
          style={{ height: window.innerHeight }}
        >
          <aside className="perfume-sidenav">
            <Collapsible accordion={false}>
              <CollapsibleItem
                expanded={true}
                header="SEARCH"
                icon={null}
                node="div"
              >
                <form
                  onSubmit={this.initializeSearchInfo}
                  style={{ padding: "0px 10px 0 10px", color: "#4f4f4f" }}
                >
                  <Autocomplete
                    icon={<Icon>search</Icon>}
                    options={{
                      data: {
                        시트러스: null,
                        새콤: null,
                        신선: null,
                        상큼: null,
                        상콤: null,
                        과일: null,
                        꽃: null,
                        여성스러운: null,
                        여자여자한: null,
                        플로럴: null,
                        풀: null,
                        아로마: null,
                        허브: null,
                        향긋: null,
                        스파이스: null,
                        톡쏘는: null,
                        강렬한: null,
                        달달한: null,
                        달다구리한: null,
                        남자다운: null,
                        나무: null,
                        숲: null,
                        분내: null,
                        파우더리: null,
                        뽀송: null,
                        봄: null,
                        여름: null,
                        가을: null,
                        겨울: null,
                      },
                    }}
                    placeholder=" 검색어를 입력해주세요."
                  />
                </form>
              </CollapsibleItem>
              <CollapsibleItem
                expanded={true}
                header="COLLECTIONS"
                icon={null}
                node="div"
              >
                <div className="sidenav-indicator">GENDER</div>
                <div className="gender-radio-wrapper">
                  <RadioGroup
                    label=""
                    name="gender"
                    options={[
                      { label: "SHRD", value: "all" },
                      { label: "MALE", value: "0" },
                      { label: "FMLE", value: "1" },
                    ]}
                    value={gender}
                    onChange={({ target: { value } }) =>
                      this.handleGender(value)
                    }
                  />
                </div>
                <div className="sidenav-indicator">CATEGORY</div>
                <div className="category-checkbox-grid">
                  {this.props.category.map((cat) => {
                    return (
                      <Checkbox
                        onChange={this.handleCategory}
                        key={cat.id + "ckbx"}
                        {...cat}
                      />
                    );
                  })}
                </div>
              </CollapsibleItem>
              <CollapsibleItem
                expanded={true}
                header="BRANDS"
                icon={null}
                node="div"
              >
                <div style={{padding: '12px 30px', textAlign:'center'}}>
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
                    <option value="all">ALL</option>
                    {this.props.fbrand.map((br) => (
                      <option key={br.id + "key"} value={br.id}>
                        {br.name}
                      </option>
                    ))}
                  </Select>
                    <a className="bmc-button center" target="_blank" rel="noopener noreferrer" href="https://www.buymeacoffee.com/wHexPZL">
                      <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee" />
                    <span style={{marginLeft:15, fontSize:28}}>Buy us a coffee</span></a>
                </div>
                <p style={{color: '#6f6f6f'}}>Laure Richis, 2020</p>
              </CollapsibleItem>
            </Collapsible>
          </aside>
          <div>
          {/* <img src={ban} alt="" style={{ width: '100%', marginTop: '1.5rem'}} /> */}
            <section className="perfume-list-container-header-wrapper">
            <div className="survey_chatbot_title" style={{width: '100%', margin:'0', boxShadow:'none', backgroundColor: '#4f4f4f'}}>
            <div className="chatbot_start">
              <img src={icon_l} alt="" style={{ width: '30px' }} />
              {this.props.num_pages} 페이지 중 {page} 페이지 | ITEM:{this.props.num_pages * 12}개
            </div>
            <div className="chatbot_end">
            </div>
          </div>


            <section className="perfume-sub-nav">
              {sort !== "alpha" ? (
                <NavLink
                  to={`/perfume?page=1&sort=alpha&brand=${brand}&category=${category}&exclude=${exclude}&include=${include}&gender=${gender}`}
                >
                  <Icon tiny>sort_by_alpha</Icon>
                  <span>사전순</span>
                </NavLink>
              ) : (
                <NavLink to="#" className="disabled-link">
                  <Icon tiny>sort_by_alpha</Icon>
                  <span>사전순</span>
                </NavLink>
              )}
              {sort !== "rate" ? (
                <NavLink
                  to={`/perfume?page=1&sort=rate&brand=${brand}&category=${category}&exclude=${exclude}&include=${include}&gender=${gender}`}
                >
                  <Icon tiny>thumbs_up_down</Icon>
                  <span>평점순</span>
                </NavLink>
              ) : (
                <NavLink to="#" className="disabled-link">
                  <Icon tiny>thumbs_up_down</Icon>
                  <span>평점순</span>
                </NavLink>
              )}
              {sort !== "reviewcnt" ? (
                <NavLink
                  to={`/perfume?page=1&sort=reviewcnt&brand=${brand}&category=${category}&exclude=${exclude}&include=${include}&gender=${gender}`}
                >
                  <Icon tiny>rate_review</Icon>
                  <span>리뷰순</span>
                </NavLink>
              ) : (
                <NavLink to="#" className="disabled-link">
                  <Icon tiny>rate_review</Icon>
                  <span>리뷰순</span>
                </NavLink>
              )}
              {sort !== "expensive" ? (
                <NavLink
                  to={`/perfume?page=1&sort=expensive&brand=${brand}&category=${category}&exclude=${exclude}&include=${include}&gender=${gender}`}
                >
                  <Icon tiny>monetization_on</Icon>
                  <span>높은 가격 순</span>
                </NavLink>
              ) : (
                <NavLink to="#" className="disabled-link">
                  <Icon tiny>monetization_on</Icon>
                  <span>높은 가격 순</span>
                </NavLink>
              )}
              {sort !== "cheap" ? (
                <NavLink
                  to={`/perfume?page=1&sort=cheap&brand=${brand}&category=${category}&exclude=${exclude}&include=${include}&gender=${gender}`}
                >
                  <Icon tiny>money</Icon>
                  <span>낮은 가격 순</span>
                </NavLink>
              ) : (
                <NavLink to="#" className="disabled-link">
                  <Icon tiny>money</Icon>
                  <span>낮은 가격 순</span>
                </NavLink>
              )}
            </section>
            
            <div className="pagenation-container">
              <Pagination
                activePage={Number(page)}
                activeClass="active-page-now"
                itemsCountPerPage={12}
                totalItemsCount={12 * this.props.num_pages}
                pageRangeDisplayed={15}
                onChange={this.handlePage}
              />
            </div>
            </section>
            <Row style={{ backgroundColor: "#fafafa" }}>
              {perfumeLoading === true
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
                          height: "300px",
                        }}
                      >
                        <div
                          className="card-image"
                          style={{
                            textAlign: "center",
                            lineHeight: "232px",
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
            </Row>
          </div>
        </section>
      </section>
    );
  }
}

export default connect(
  (state) => ({
    perfumes: state.perfume.get("perfumesList"),
    num_pages: state.perfume.get("num_pages"),
    pender: state.pender.success,
    category: state.perfume.get("category"),
    fbrand: state.perfume.get("fbrand"),
  }),
  (dispatch) => ({
    PerfumeActions: bindActionCreators(perfumeActions, dispatch),
  })
)(Perfumes);
