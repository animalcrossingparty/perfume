import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as perfumeActions from "redux/modules/perfume";
import { Cards } from "components/";
import { Link } from "react-router-dom";
import { Row, Col, Pagination, Icon } from "react-materialize";
import queryString from "query-string";

interface PerfumeProps {
  PerfumeActions: any;
  perfumes: any;
}

class Perfumes extends Component<PerfumeProps> {
  initializePerfumeInfo = async () => {
    const { PerfumeActions } = this.props;
    const queryParams = queryString.parse(window.location.search);
    console.log(queryParams)
    await PerfumeActions.getPerfumeInfo(queryParams);
  };

  componentDidMount() {
    this.initializePerfumeInfo();
  }


  handlePage = async (selectedPage) => {
    const {
      sort,
      brand,
      category,
      exclude,
      include,
      gender,
    } = queryString.parse(window.location.search);
    window.history.pushState(
      "",
      "",
      `/perfume?page=${selectedPage}&sort=${sort}&brand=${brand}&category=${category}&exclude=${exclude}&include=${include}&gender=${gender}`
    );
    const { PerfumeActions } = this.props;
    await PerfumeActions.getPerfumeInfo(
      brand,
      category,
      exclude,
      gender,
      include,
      selectedPage,
      sort
    );
  };

  render() {
    const { perfumes } = this.props;
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
      <div>
        <Row>
          <Col>
            <Link
              to={`/perfume?page=${page}&sort=alpha&brand=${brand}&category=${category}&exclude=${exclude}&include=${include}&gender=${gender}`}
            >
              ALPHA
            </Link>
          </Col>
          <Col>
            <Link
              to={`/perfume?page=${page}&sort=rate&brand=${brand}&category=${category}&exclude=${exclude}&include=${include}&gender=${gender}`}
            >
              RATE
            </Link>
          </Col>
        </Row>
        <div className="pagenation-container">
          <Pagination
            activePage={Number(page)}
            items={20}
            leftBtn={<Icon>chevron_left</Icon>}
            rightBtn={<Icon>chevron_right</Icon>}
            onSelect={this.handlePage}
          />
        </div>
        <Row className="wrap">
          {perfumes.map((perfume, i) => (
            <Col s={12} m={6} l={4} xl={3} key={perfume.id}>
              <Cards field={perfume} id={perfume.id} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    perfumes: state.perfume.get("perfumesList"),
  }),
  (dispatch) => ({
    PerfumeActions: bindActionCreators(perfumeActions, dispatch),
  })
)(Perfumes);
