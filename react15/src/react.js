import { wrapToVdom,shallowEqual } from "./utils";
import { REACT_ELEMENT,REACT_FORWARD_REF_TYPE,REACT_FRAGMENT,REACT_PROVIDER,REACT_CONTEXT,REACT_MEMO } from "./constants";
import {Component} from './Component';
// React.createElement("h1", {
//     className: "title",
//     style: {
//       color: 'red'
//     }
//   }, "hello");

function createElement(type,config,children) {
    let ref
    let key
    if (config) {
        ref = config.ref;
        key = config.key;
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
  function forwardRef(render) {  
    var elementType = {
      $$typeof: REACT_FORWARD_REF_TYPE,
      render: render
    };
    return elementType;
  }
function createContext() {
    const context =  { current:undefined}
    context.Provider = {
        $$typeof: REACT_PROVIDER,
        _context: context
    }
    context.Consumer = {
        $$typeof: REACT_CONTEXT,
        _context: context
    }
    return  context
} 
function cloneElement(element,newProps,...newChildren) {
   let oldChildren =element.props && element.props.children;
   let children =[...(Array.isArray(oldChildren)?oldChildren:[oldChildren]),...newChildren]
   .filter(item => item !== undefined)
   .map(wrapToVdom);
    if (children.length === 1) children = children[0];
    let props = { ...element.props, ...newProps, children };
    return { ...element, props };
}
class PureComponent extends Component {
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
    Fragment: REACT_FRAGMENT

}
export default React