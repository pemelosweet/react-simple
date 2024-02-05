import React from 'react';
import { shallowEqual } from 'react-redux';
import ReactReduxContext from '../ReactReduxContext';

function useSelector(selector,equalityFn = shallowEqual){
  // 获取仓库
  const {store} = React.useContext(ReactReduxContext);
  // 获取仓库的状态
  const state = store.getState();
   //初始化老状态
   const lastSelectedState = React.useRef(null);  
  //初始化新状态
  let selectedState = selector(state);
  //通过useReducer关联更新
  const [,forceUpdate] = React.useReducer(x=>x+1,0);
  React.useLayoutEffect(()=>{
    return store.subscribe(()=>{
        const state = store.getState();
        //更新仓库的数据
        let selectedState = selector(state);
        //进行浅比较
        if(!equalityFn(lastSelectedState.current,selectedState)){
            lastSelectedState.current=selectedState;
            //进行重新渲染
            forceUpdate();
        }
    });
  },[]);
  //返回新状态
  return selectedState;
}
export default useSelector;