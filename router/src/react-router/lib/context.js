import React from 'react';
export const LocationContext = React.createContext(null);
export const NavigatorContext = React.createContext(null);
export const RouteContext = React.createContext({
    outlet: null,//匹配的子路由对应的组件
    matches: []//meta匹配的结果 
});
