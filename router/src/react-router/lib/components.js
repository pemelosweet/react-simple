import React from 'react';
import {LocationContext,NavigatorContext} from './context';
import {useRoutes,useOutlet} from './hooks';
export function Router({children,location,navigator}){
    return (
        <NavigatorContext.Provider value={{navigator}}>
            <LocationContext.Provider value={{location}}>
                {children}
            </LocationContext.Provider>
        </NavigatorContext.Provider>
    )
}

export  function Routes({children}) {
    const routes =createRoutesFromChildren(children) 
    return   useRoutes(routes);
}
// 把虚拟DOM儿子数组转换成一个普通的JS对象，方便后续匹配
function  createRoutesFromChildren(children) {
    const routes =[]
    React.Children.forEach(children,(child)=>{
        let route={
            path:child.props.path,
            element:child.props.element
        }
        if (child.props.children) {
            route.children =createRoutesFromChildren(child.props.children)
        }
        routes.push(route)
    })
    return  routes
}
export function Route(){
    
}
export function Outlet(){
    return useOutlet();
}