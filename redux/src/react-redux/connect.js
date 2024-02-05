import React from 'react';
import ReactReduxContext from './ReactReduxContext';
import {bindActionCreators} from '../redux';
function connect_bak(mapStateToProps, mapDispatchToProps) {
    return function (OldComponent) {
        return class extends React.Component {
            static contextType =  ReactReduxContext
            constructor(props,context){
                    super(props)
                    const {store} =context
                    const {getState,subscribe,dispatch}  = store;
                    this.state =mapStateToProps(getState())
                    let dispatchProps={};
                    if(typeof mapDispatchToProps ==='function' ){
                        dispatchProps = mapDispatchToProps(store.dispatch);
                    }else if(typeof mapDispatchToProps ==='object'){
                        dispatchProps = bindActionCreators(mapDispatchToProps,store.dispatch);
                    }else{
                        dispatchProps={dispatch}
                    }
                    this.dispatchProps = dispatchProps;
                    this.unsubscribe = subscribe(()=>{
                        this.setState(mapStateToProps(getState()));
                    });
            }
            componentWillUnmount(){
                this.unsubscribe();
            }
            render() {
                return <OldComponent {...this.props} {...this.state} {...this.dispatchProps} ></OldComponent>
            }
        }
    }
}
function connect(mapStateToProps, mapDispatchToProps) {
    return function (OldComponent) {
        return (props)=>{
            //获取仓库
            const {store} =React.useContext(ReactReduxContext)
            const {getState,subscribe,dispatch}  = store;
            const prevState = getState();
            //缓存仓库的值
            const stateProps =React.useMemo(()=>{
                return  mapStateToProps(prevState)
            },[prevState])
            //缓存仓库的dispatch
            const dispatchProps=React.useMemo(()=>{
                let dispatchProps={};
                if(typeof mapDispatchToProps ==='function' ){
                    dispatchProps = mapDispatchToProps(store.dispatch);
                }else if(typeof mapDispatchToProps ==='object'){
                    dispatchProps = bindActionCreators(mapDispatchToProps,store.dispatch);
                }else{
                    dispatchProps={dispatch}
                }
                return dispatchProps;
            },[dispatch]); 
            // 通过subscribe进行监听 使用useReducer提供的方法
            const [,forceUpdate] = React.useReducer(x=>x+1,0);
            React.useLayoutEffect(()=>{
                return subscribe(forceUpdate);
            },[]);    
            return <OldComponent {...props} {...stateProps} {...dispatchProps}/>
        }
    }
}
export default connect
