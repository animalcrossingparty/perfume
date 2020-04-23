import React, { Component } from 'react';

import BeautyStars from 'beauty-stars';


// 출처 : https://github.com/Leocardoso94/beauty-stars?ref=morioh.com

export default class App extends Component {
  state = { value: 4, size: '15px', gap: '7px', editable: false, activeColor: 'rgb(247, 214, 138)'  }
  render() {
    return (
      <BeautyStars
        value={this.state.value}
        size={this.state.size}
        gap={this.state.gap}
        editable={this.state.editable}
        activeColor={this.state.activeColor}
        onChange={value => this.setState({ value })}
      />
    );
  }
}