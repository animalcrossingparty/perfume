import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as perfumeActions from 'redux/modules/perfume';
import { Cards } from 'components/'
import { Row, Col, Pagination, Icon } from 'react-materialize'
import queryString from 'query-string'

interface PerfumeProps {
  PerfumeActions: any,
  perfumes: any,
}


class Perfumes extends Component<PerfumeProps> {
  initializePerfumeInfo = async () => {
    const {PerfumeActions} = this.props
    const page = queryString.parse(window.location.search).page
    await PerfumeActions.getPerfumeInfo(page, 12);
  }

  componentDidMount() {
    this.initializePerfumeInfo()
  }
  
  handlePaging = async(selectedPage) => {
      window.history.pushState('', '', `/perfume?page=${selectedPage}`);
      const {PerfumeActions} = this.props
      await PerfumeActions.getPerfumeInfo(selectedPage, 12);
    }

  render() {
    const { perfumes } = this.props
    const page = queryString.parse(window.location.search).page
    return (
    <div>
      <Pagination
        activePage={Number(page)}
        items={5}
        leftBtn={<Icon>chevron_left</Icon>}
        rightBtn={<Icon>chevron_right</Icon>}
        onSelect={this.handlePaging}
      />
      <Row className="wrap">
        {
          perfumes.map((perfume, i) =>
          <Col s={2} key={perfume.pk}>
            <Cards field={perfume.fields} />
          </Col>
          )
        }
      </Row>
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