import React,{useState} from 'react';
import {createBrowserHistory} from '../router';
import { Router,useNavigate } from '../react-router';
export * from '../react-router';
export function BrowserRouter({ children }){
    const  historyRef =React.useRef(null)
    if (historyRef.current===null) {
            historyRef.current= createBrowserHistory()
    } 
    const history =historyRef.current
     const [state, setState] = useState({
        action: history.action,
        location: history.location//当前路径
     });
     React.useLayoutEffect(() => history.listen(setState), [history]);
     return (
        <Router
        children={children}
        location={state.location}
        navigationType={state.action}
        navigator={history}
    />
     )
}

export const Link = function(props){
        const {to,state,...rest} = props;
        const navigate = useNavigate();
        const handleClick = (event)=>{
         event.preventDefault();
         navigate(to,state);
        }
        return (
         <a
            {...rest}
            onClick={handleClick}
         />
        )
     }