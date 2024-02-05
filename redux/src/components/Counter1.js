import React, { Component } from 'react';
import { bindActionCreators} from '../redux';
import store from '../store/index';
import actions from '../store/actions/counter1';

class Counter1 extends Component {
   constructor(props){
    super(props)
    this.state ={
      number:0
    }
   }
  unsubscribe;
  componentDidMount(){
    this.unsubscribe =store.subscribe(()=>this.setState({number: store.getState().counter1.number}))
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  render() {
    const bindAction =bindActionCreators(actions,store.dispatch)
    return (
      <div>
        {this.state.number}
        <br></br>
        <button onClick={bindAction.add1}>+</button>
        <button onClick={bindAction.minus1}>-</button>
      </div>
    );
  }
}

export default Counter1;
