import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as perfumeActions from 'redux/modules/perfume';

interface PerfumeProps {
  PerfumeActions: any,
  perfumes: any
}

class Perfumes extends Component<PerfumeProps> {

  initializePerfumeInfo = async () => {
    const {PerfumeActions} = this.props
    await PerfumeActions.getPerfumeInfo();
  }

  componentDidMount() {
    this.initializePerfumeInfo()
  }
  render() {
    const { perfumes } = this.props
    return (
    <div>
    <ul>
    {perfumes.map((perfume, i) => <ol>{JSON.stringify(perfume)}</ol>)}
    </ul>
    </div>
    )
  }
}

export default connect(
  (state) => ({
    perfumes: state.perfume.get('perfumesList', 'perfumes')
  }),
  (dispatch) => ({
    PerfumeActions: bindActionCreators(perfumeActions, dispatch)
  })
)(Perfumes);