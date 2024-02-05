import React, { Component } from 'react';
import actions from '../store/actions/counter1';
import { connect } from '../react-redux';
class Counter3 extends Component {
  render() {
    let { number, add1, minus1 } = this.props;
    return (
      <div>
        {number}
        <br></br>
        <button onClick={add1}>+</button>
        <button onClick={minus1}>-</button>
      </div>
    );
  }
}
let mapStateToProps = (state) => state.counter1;
export default connect(
  mapStateToProps,actions
)(Counter3)
