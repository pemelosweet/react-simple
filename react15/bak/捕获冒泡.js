import React from './react';
import ReactDOM from './react-dom';
class ClassComponent extends React.Component{
   constructor(props){
    super(props);
    this.state = {number:0};
   }
   //其实一下以来在react类组件中的this一直就是个问题  bind 匿名
   handleClick = ()=>{
    //在进入事件回调之前先把批量更新打开
    //因为我这里的callback也是箭头函数，所以说它的this永远也指向类组件的实例
    this.setState({number:this.state.number+1}, ()=> {
      
    });
    console.log(this.state.number);
    this.setState({number:this.state.number+1});
    console.log(this.state.number);
    setTimeout(()=>{
      this.setState({number:this.state.number+1});
      console.log(this.state.number);
      this.setState({number:this.state.number+1});
      console.log(this.state.number);
    },1000);
   }
   clickDivCapture = (event)=>{
    console.log('clickDivCapture');
   }
   clickMyPCapture = ()=>{
    console.log('clickMyPCapture');
   }
   clickButtonCapture = (event)=>{
    console.log('clickButtonCapture');
   }
   clickButton = (event)=>{
    console.log('clickButtonBubble');
    event.stopPropagation();
   }
   clickDiv = (event)=>{
    console.log('clickDivBubble');
   }
   render(){
    //document -counter-myp-button
    return (
     <div id="counter" onClick={this.clickDiv} onClickCapture={this.clickDivCapture}>
      <div id="myp" onClickCapture={this.clickMyPCapture}>
        <p >number:{this.state.number}</p>
        <button onClick={this.clickButton} onClickCapture={this.clickButtonCapture}>+</button>
      </div>
     </div>
    )
   }
}
setTimeout(()=>{
document.getElementById('myp')
.addEventListener('click',()=>console.log('myp capture'),true)
},1000);

let element = <ClassComponent title="world"/>
ReactDOM.render(
    element,document.getElementById('root')
  );


