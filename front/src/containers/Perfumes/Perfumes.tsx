import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as perfumeActions from 'redux/modules/perfume';
import { Cards } from 'components/'
import { Row, Col, Pagination, Icon, Tabs, Tab } from 'react-materialize'
import queryString from 'query-string'

interface PerfumeProps {
  PerfumeActions: any,
  perfumes: any,
}


class Perfumes extends Component<PerfumeProps> {

  initializePerfumeInfo = async () => {
    const { PerfumeActions } = this.props
    const page = queryString.parse(window.location.search).page
    await PerfumeActions.getPerfumeInfo(page);
  }

  componentDidMount() {
    this.initializePerfumeInfo()
  }

  handlePaging = async (selectedPage) => {
    window.history.pushState('', '', `/perfume?page=${selectedPage}`);
    const { PerfumeActions } = this.props
    await PerfumeActions.getPerfumeInfo(selectedPage);
  }

  render() {
    const { perfumes } = this.props
    const page = queryString.parse(window.location.search).page
    return (
      <div>
        
        <Tabs
          className="z-depth-1"
          options={{
            swipeable: false
          }}
        >
          <Tab
            active={1}
            options={{
              duration: 300,
              onShow: null,
              responsiveThreshold: Infinity,
              swipeable: false
            }}
            title={"by BRAND"}
          >
            <div className="pagenation-container">
              <Pagination
                activePage={Number(page)}
                items={20}
                leftBtn={<Icon>chevron_left</Icon>}
                rightBtn={<Icon>chevron_right</Icon>}
                onSelect={this.handlePaging}
              />
            </div>
            <Row className="wrap">
              {
                perfumes.map((perfume, i) =>
                  <Col s={12} m={6} l={4} xl={3} key={perfume.id}>
                    <Cards field={perfume} id={perfume.id} />
                  </Col>
                )
              }
            </Row>
          </Tab>
          <Tab title="by ALPHA"></Tab>
          <Tab title="by PRICE"></Tab>
        </Tabs>
      </div>
    )
  }
}

export default connect(
  (state) => ({
          perfumes: state.perfume.get('perfumesList')
  }),
  (dispatch) => ({
          PerfumeActions: bindActionCreators(perfumeActions, dispatch)
  })
)(Perfumes);