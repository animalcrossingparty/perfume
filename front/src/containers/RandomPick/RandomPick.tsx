import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as perfumeActions from "redux/modules/perfume";
import { Row, Col, ProgressBar } from "react-materialize";
import { Link } from "react-router-dom";

interface RandomProps {
  PerfumeActions: any;
  randList: any;
  history: any;
}

class RandomPick extends Component<RandomProps> {
  initializePerfumeInfo = async () => {
    const { PerfumeActions } = this.props;
    await PerfumeActions.getRandInfo();
  };

  componentDidMount() {
    this.initializePerfumeInfo();
  }

  render() {
    const { randList } = this.props;
    return (
      <Row className="random_perfume_center">
        {randList.length > 1 ? (
          randList.splice(0,5).map((perfume) => {
            return (
              <Col key={perfume.name + 'idrdp'} s={12} m={6} l={4} xl={2} className="hover-shadow">
              {/* <Col key={perfume.name + 'idrdp'} className="hover-shadow"> */}
                <h5 style={{color: ''}} className="card-c-title center px-3 thin ran_car_name">{perfume.name}</h5>
                <Link to={`/detail/${perfume.id}`}>
                  <div
                    style={{
                      height: "200px",
                      width: "130px",
                      margin: "0 auto",
                      backgroundImage: `url(${perfume.thumbnail})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                  </div>
                </Link>
              </Col>
            );
          })
        ) : (
          <Col s={2} style={{height: 253.22}}>
            <ProgressBar style={{width:'100%', height:'50px'}} />
          </Col>
        )}
      </Row>
    );
  }
}

export default connect(
  (state) => ({
    randList: state.perfume.get("randList"),
  }),
  (dispatch) => ({
    PerfumeActions: bindActionCreators(perfumeActions, dispatch),
  })
)(RandomPick);
