import React from './react';
import ReactDOM from './react-dom';
class Form extends React.Component {
    input
    constructor(props) {
        super(props);
        this.input = React.createRef();
    }
    getFocus = () => {
        console.log(this.input,'111');
        this.input.current.getFocus();
    }
    render() {
        return (
            <>
                <TextInput ref={this.input} />
                <button onClick={this.getFocus}>获得焦点</button>
            </>
        );
    }
}
class TextInput extends React.Component {
    input
    constructor(props) {
        super(props);
        this.xx = React.createRef();
    }
    getFocus = () => {
        this.xx.current.focus();
    }
    render() {
        return <input ref={this.xx} />
    }
}
ReactDOM.render(
    <Form />,
    document.getElementById('root')
);