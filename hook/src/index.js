import React from './react';
import ReactDOM from './react-dom';
const Index = () => {
  const [state, setState] = React.useState(100);
  const [count, setCount] = React.useState(0);
  const [count2, setCount2] = React.useState(0);
  // const  countMemo =useMemo(()=>({count}),[count])
  
  const  countMemo2 =React.useMemo(()=>({count2}),[count2])
  const goDetails =()=>{
    // const xhr = new XMLHttpRequest();
    // xhr.open('GET', '/public/index.html', true);
    // xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    // xhr.send(JSON.stringify({data: 'some data'}));
    // xhr.onreadystatechange = function() {
    //   if (xhr.readyState === 4 && xhr.status === 200) {
    //     const responseText = xhr.responseText;
    //     // console.log(responseText);
    //   }
    // };
    console.log(document.documentElement.outerHTML,'document.documentElement.outerHTML');
    console.log(document,123123);
  }
  return (
    <div id='myDiv'>
      {state}
      <Child count={count} ></Child>
      <Child2 count={countMemo2} ></Child2>
      <button onClick={()=>{setState(state+1)}}>主按钮</button>
      <button onClick={()=>{setCount(count+1)}}>子1按钮</button>
      <button onClick={()=>{setCount2(count2+1)}}>子2按钮</button>
      <button onClick={()=>{goDetails()}}>查看</button>
    </div>
  );
}

let Child = (props) => {
  React.useEffect(()=>{
    console.log(props,111);
  })
  return (
    <div>
     {props.count}
    </div>
  );
}
let Child2 = (props) => {
  React.useEffect(()=>{
    console.log(props,222);
  })
  return (
    <div>
      {props.count.count2}
    </div>
  );
}
// export default Index;
Child = React.memo(Child);
Child2 = React.memo(Child2);
ReactDOM.render(
  <Index/>,
  document.getElementById('root')
);