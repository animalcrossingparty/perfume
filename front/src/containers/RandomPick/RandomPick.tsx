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
      <Row>
        {randList.length > 1 ? (
          randList.map((perfume) => {
            return (
              <Col s={2}>
                <h5 style={{color: ''}} className="card-c-title center px-3 thin">{perfume.name}</h5>
                <Link to={`/detail/${perfume.id}`}>
                  <div
                    style={{
                      height: "300px",
                      backgroundImage: `url(${perfume.thumbnail})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    
                  
                  </div>
                </Link>
              </Col>
            );
          })
        ) : (
          <Col s={2}>
            <ProgressBar />
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
