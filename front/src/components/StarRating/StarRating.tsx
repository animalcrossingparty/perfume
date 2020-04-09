import React, { Component } from 'react';
import BeautyStars from 'beauty-stars';


// 출처 : https://github.com/Leocardoso94/beauty-stars?ref=morioh.com

export default class App extends Component {
  state = { value: 0, size: '25px', gap: '8px' }
  render() {
    return (
      <BeautyStars
        value={this.state.value}
        size={this.state.size}
        gap={this.state.gap}
        onChange={value => this.setState({ value })}
      />
    );
  }
}