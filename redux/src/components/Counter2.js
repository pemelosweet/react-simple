import React, { Component } from 'react';
import { createStore,bindActionCreators } from '../redux';
import * as types from '../store/action-types';

let initState = { number: 0 };
function reducer(state=initState, action) {
  switch (action.type) {
    case types.ADD2:
      return { number: state.number + 1 }
    case types.MINUS2:
      return { number: state.number - 1 }
    default:
      return state
  }
}
const store = createStore(reducer, initState);

class Counter1 extends Component {
   constructor(props){
    super(props)
    this.state ={
      number:0
    }
   }
  unsubscribe;
  componentDidMount(){
    this.unsubscribe =store.subscribe(()=>this.setState({number: store.getState().number}))
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  render() {
    const add=()=> {
      return { type: types.ADD2 };
    }
    const minus=()=> {
      return { type: types.MINUS2 };
    }
    const actions ={add, minus}
    const bindAction =bindActionCreators(actions,store.dispatch)
    return (
      <div>
        {this.state.number}
        <br></br>
        <button onClick={bindAction.add}>+</button>
        <button onClick={bindAction.minus}>-</button>
      </div>
    );
  }
}

export default Counter1;
