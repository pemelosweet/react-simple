import React, { useRef,useState } from 'react';
import ReactDOM from 'react-dom';

function Child(props,ref) {
    const inputRef =useRef('')
    const [count, setCount] = useState(200);
    React.useImperativeHandle(ref, () => (
        {
            xxx() {
                inputRef.current.focus();
            },
            aa(){
                console.log(count);
            }
        }
    ));
    return (
       <div>
         <input type="text"  ref={inputRef}/>
         {count}
         <button onClick={()=>{setCount(count+1)}}>+</button>
       </div>
    )
}
const ForwardChild = React.forwardRef(Child);
function Parent() {
    const [number, setNumber] = useState(0);
    const inputRef1 = useRef();
    const getFocus =()=>{
        inputRef1.current.xxx()
        inputRef1.current.aa()
    }
    return  (
        <div>
            <ForwardChild  ref={inputRef1} ></ForwardChild>
            <button onClick={getFocus}>获得焦点</button>
            <div> {number}</div>
            <button onClick={()=>{setNumber(number+1)}}>+</button>
        </div>
    )
}
ReactDOM.render(<Parent/>,document.getElementById('root'));