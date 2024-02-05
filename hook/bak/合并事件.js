import React from "./react";
import ReactDOM from "./react-dom";
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { number: 0 };
    }
    handleClick = () => {
        this.setState({ number: this.state.number + 1 },function(){
            console.log(this);
        });
        console.log(this.state.number,'---1');
        // setTimeout(() => {
        //     this.setState({ number: this.state.number + 1 });
        //     console.log(this.state.number,'---2');
        //     this.setState({ number: this.state.number + 1 });
        //     this.setState({ number: this.state.number + 1 });
        //     console.log(this.state.number,'---3');
        // },0);
    }
    render() {
        return (
            <div >
                <p>{this.props.title}</p>
                <p>numbers:{this.state.number}</p>
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
}
ReactDOM.render(<Counter title="计数器" />, document.getElementById("root"));