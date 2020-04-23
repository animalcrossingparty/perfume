import React, { Component } from 'react';
import BeautyStars from 'beauty-stars';


// 출처 : https://github.com/Leocardoso94/beauty-stars?ref=morioh.com

export default class App extends Component {
  state = { value: 0, size: '25px', gap: '8px', inactiveColor: 'rgba(110, 100, 64, 0.2)', activeColor: 'rgb(247, 214, 138)' }
  render() {
    return (
      <BeautyStars
        value={this.state.value}
        size={this.state.size}
        gap={this.state.gap}
        inactiveColor={this.state.inactiveColor}
        activeColor={this.state.activeColor}
        onChange={value => this.setState({ value })}
      />
    );
  }
}