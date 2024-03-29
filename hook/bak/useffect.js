import React from 'react';
import ReactDOM from 'react-dom';
function Counter() {
    const [number, setNumber] = React.useState(0);
    let handleClick = ()=> setNumber(number+1)
    React.useEffect(() => {
        console.log(1);
        console.log('开启一个新的定时器')
        const $timer = setInterval(() => {
            setNumber(number => number + 1);
        }, 1000);
        return () => {
            console.log('销毁老的定时器');
            clearInterval($timer);
        }
    },[]);
    return (
        <div>
            <p>{number}</p>
            <button onClick={handleClick}>+</button>
        </div>

    )
}
ReactDOM.render(<Counter />, document.getElementById('root'));