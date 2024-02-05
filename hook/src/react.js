import { wrapToVdom,shallowEqual } from "./utils";
import { REACT_ELEMENT,REACT_FORWARD_REF_TYPE,REACT_FRAGMENT,REACT_PROVIDER,REACT_CONTEXT,REACT_MEMO } from "./constants";
import {Component} from './Component';
import * as hooks from './react-dom';
/**
 * 根据参数，返回一个React元素
 * @param {*} type   元素的类型 div span
 * @param {*} config 配置对象 className style
 * @param {*} children  后面所有参数都是children,children可能有，也可能没有，可能有一个，也可能有多个
 * @returns  返回一个React元素
 */
function createElement(type,config,children) {
    let ref
    let key
    if (config) {
        ref = config.ref; //是用来引用此元素的
        key = config.key; //key是用来标记一个父亲的唯一儿子的
        delete config.ref;
        delete config.key;
        delete config.__source;
        delete config.__self;
    }
    let props ={...config}
    if (arguments.length > 3) {
        props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
    }else{
        props.children = wrapToVdom(children);
    }
    return {
        $$typeof: REACT_ELEMENT,
        type,
        ref,
        key,
        props,
    }
}
function createRef(){
      return {current:null};
  }
  //其实函数组件本质上就是render方法，就是接收属性，返回react元素
  function forwardRef(render) {  
    var elementType = {
      $$typeof: REACT_FORWARD_REF_TYPE,
      render: render // 其实就是原来的函数组件那个函数
    };
    return elementType;
  }
function createContext() {
    const context =  { current:undefined}
    context.Provider = {
        $$typeof: REACT_PROVIDER,//供应商
        _context: context
    }
    context.Consumer = {
        $$typeof: REACT_CONTEXT,//上下文
        _context: context
    }
    return  context
} 
// function cloneElement(element,newProps,...newChildren) {
//    let oldChildren =element.props && element.props.children;
//    let children =[...(Array.isArray(oldChildren)?oldChildren:[oldChildren]),...newChildren]
//    .filter(item => item !== undefined)
//    .map(wrapToVdom);
//     if (children.length === 1) children = children[0];
//     let props = { ...element.props, ...newProps, children };
//     return { ...element, props };
// }
function cloneElement(element,newProps,children){
    let props = {...element.props,...newProps};
    if(arguments.length>3){
        props.children = Array.prototype.slice.call(arguments,2).map(wrapToVdom)
    //如果说等于3，那就是只有一个儿子
    }else if(arguments.length===3){
        props.children = wrapToVdom(children);
    }
    return {
        ...element,
        props
    }
}
class PureComponent extends Component {
    //重写了shouldComponentUpdate
      shouldComponentUpdate(newProps, nextState) {
            return !shallowEqual(this.props, newProps) || !shallowEqual(this.state, nextState);
          }
}
function memo(type, compare = shallowEqual) {
      return {
        $$typeof: REACT_MEMO,
        type,
        compare
      }
    }
const React ={
    createElement,
    createContext,
    Component,
    createRef,
    forwardRef,
    cloneElement,
    PureComponent,
    memo,
    Fragment: REACT_FRAGMENT,
    ...hooks

}
export default React
// export * as  React;