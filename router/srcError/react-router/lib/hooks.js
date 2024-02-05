import React from 'react';
import {NavigatorContext,LocationContext,RouteContext} from './context';
import {matchRoutes} from '../../router';
// 用当前的路径和routes里面的path进行匹配，如果匹配上就渲染对应的element
export  function useLocation() {
    const {location} = React.useContext(LocationContext);
    return location
}
export  function useRoutes(routes) {
    const location = useLocation();
    const {pathname} = location;// / /user /profile
    const matches = matchRoutes(routes,{pathname});
    console.log(matches,'matches');
    if(matches){
        return renderMatches(matches);
    }
}
function renderMatches(renderMatches){
   console.log(renderMatches,'renderMatches');
   let result =  renderMatches.reduceRight((outlet,match,index)=>{
       const matches = renderMatches.slice(0,index+1);
       return (
        <RouteContext.Provider value={{outlet,matches}}>
            {match.route.element}
        </RouteContext.Provider>
       );//UserList
   },null);
   return result;
}
export function useNavigate() {
    const {navigator} = React.useContext(NavigatorContext);//history
    let navigate =React.useCallback((to,state)=>{
        navigator.push(to,state)
    },[navigator])
    return navigate;
}
export function useParams() {
    const {matches} = React.useContext(RouteContext);
    const routeMatch = matches[matches.length-1];
    return routeMatch?routeMatch.params:{};
}

export function useOutlet(){
    const value = React.useContext(RouteContext);
    return value.outlet;
}