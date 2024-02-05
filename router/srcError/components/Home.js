import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
class MyComponent extends Component {
  handleClick = () => { this.props.navigate("/user");}
  render() {
    return (
      <button onClick={this.handleClick}>
        Go to User
      </button>
    );
  }
}
 const withNavigation = (Component) => { return (props) => <Component {...props} navigate={useNavigate()} />; };
export default withNavigation(MyComponent);