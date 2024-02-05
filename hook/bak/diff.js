import React from './react';
import ReactDOM from './react-dom';
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ['A', 'B', 'C', 'D', 'E', 'F']
        }
    }
    handleClick = () => {
        this.setState({
            list: [...this.state.list,'M']
        });
    };
    render() {
        console.log(this.state.list,'00000');
        return (
            <React.Fragment>
                <ul>
                    {
                        this.state.list.map(item => <li key={item}>{item}</li>)
                    }

                </ul>
                <button onClick={this.handleClick}>+</button>
            </React.Fragment>
        )
    }
}
ReactDOM.render(<Counter />, document.getElementById('root'));