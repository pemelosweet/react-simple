import React from './react';
import ReactDOM from './react-dom';

function App(){
  const[number,setNumber]=React.useState(0);
  const[number1,setNumber1]=React.useState(0);
  const[number2,setNumber2]=React.useState(0);
  let handleClick = ()=> setNumber(number+1)
  return (
    <div>
      <p>{number}</p>
      <button onClick={handleClick}>+</button>
      <button onClick={()=>{
        setNumber2((state)=>{
        return state+1
      })
      }}>+</button>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);