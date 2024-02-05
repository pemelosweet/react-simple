import React from './react';
import ReactDOM from './react-dom';
const loading = message =>OldComponent => class extends React.Component{
        render(){
            const state = {
                show:()=>{
                   console.log('show', message);
                },
                hide:()=>{
                     console.log('hide', message);
                }
            }
            return  (
                <OldComponent {...this.props} {...state} {...{...this.props,...state}}/>
            )
        }
    
}
class Hello extends React.Component{
    render(){
        console.log(this.props,'222');
       return <div>hello<button onClick={this.props.show}>show</button><button onClick={this.props.hide}>hide</button></div>;
    }
  }
let LoadingHello  = loading('消息')(Hello);
ReactDOM.render(<LoadingHello />, document.getElementById('root'));