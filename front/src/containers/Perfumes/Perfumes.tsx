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
    let rawq = e.target.querySelector("input").value.split(' ');
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
    let result = [] as any[]
    rawq.map(r=> {
      console.log(r)
      if (regExp.test(r)) {
        let t = r.replace(regExp, "");
        result.push(t)
      } else {
        result.push(r)
      }
    })
    await PerfumeActions.searchInfo(result.join(','));
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
      <section style={{ backgroundColor: "#fff" }}>
        <section className="perfume-sub-nav">
          <div
            style={{
              paddingRight: "25%",
              position: "sticky",
              top: 0,
              height: 40,
            }}
          >
            <form onSubmit={this.initializeSearchInfo}>
              <Autocomplete
                icon={<Icon>textsms</Icon>}
                placeholder=" 검색어를 입력해주세요."
              />
            </form>
          </div>
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
        <section
          className="perfume-list-container"
          style={{ height: window.innerHeight }}
        >
          <aside className="perfume-sidenav">
            <Collapsible accordion={false}>
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
                <div style={{ height: "5vw", padding: "10%" }}>
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
                </div>
              </CollapsibleItem>
            </Collapsible>
          </aside>
          <div>
            {this.props.num_pages} 페이지 / {page} 페이지 | ITEM:{" "}
            {this.props.num_pages * 12}개{" "}
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
            <Row style={{ backgroundColor: "#fafafa" }}>
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
                          height: "437px",
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
    pender: state.pender.pending,
    category: state.perfume.get("category"),
    fbrand: state.perfume.get("fbrand"),
  }),
  (dispatch) => ({
    PerfumeActions: bindActionCreators(perfumeActions, dispatch),
  })
)(Perfumes);
