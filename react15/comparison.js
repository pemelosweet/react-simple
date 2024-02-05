import { addEvent } from './event';
import { REACT_TEXT, REACT_FORWARD_REF_TYPE, PLACEMENT, MOVE ,REACT_FRAGMENT} from "./constants";
import React from './react';
//渲染
function render(Vdom, container) {
    mount(Vdom, container)
}
//挂载
function mount(Vdom, container) {
    let newDOM = createDOM(Vdom)
    if (newDOM) {
        container.appendChild(newDOM);
        if (newDOM.componentDidMount) newDOM.componentDidMount();
    }
}
//创建真实dom
export function createDOM(vdom) {
    let { type, props, ref } = vdom;
    let dom;
    if (type && type.$$typeof === REACT_FORWARD_REF_TYPE) {
        return mountForwardComponent(vdom);
    } else if (type === REACT_TEXT) {
        dom = document.createTextNode(props);
    }else if (type === REACT_FRAGMENT) {
        dom = document.createDocumentFragment();
    } else if (typeof type === "function") {
        if (type.isReactComponent) {
            return mountClassComponent(vdom);
        } else {
            return mountFunctionComponent(vdom);
        }
    } else {
        dom = document.createElement(type);
    }
    if (props) {
        updateProps(dom, {}, props);
        if (typeof props.children == "object" && props.children.type) {
            props.children.mountIndex = 0;
            mount(props.children, dom);
        } else if (Array.isArray(props.children)) {
            reconcileChildren(props.children, dom);
        }
    }
    vdom.dom = dom;
    //赋值ref
    if (ref) ref.current = dom;
    return dom;
}
//加载转发ref
function mountForwardComponent(vdom) {
    let { type, props, ref } = vdom;
    let renderVdom = type.render(props, ref);
    vdom.oldRenderVdom = renderVdom;
    return createDOM(renderVdom);
}
//加载类组件
function mountClassComponent(vdom) {
    let { type, props, ref } = vdom;
    let classInstance = new type(props);
    vdom.classInstance = classInstance;
    if (ref) ref.current = classInstance;
    if (classInstance.componentWillMount) classInstance.componentWillMount();
    let renderVdom = classInstance.render();
    classInstance.oldRenderVdom = renderVdom;
    let dom = createDOM(renderVdom);
    if (classInstance.componentDidMount) {
        dom.componentDidMount = classInstance.componentDidMount.bind(classInstance);
    };
    return dom;
}
//加载函数组件
function mountFunctionComponent(vdom) {
    let { type, props } = vdom
    let renderVdom = type(props)
    vdom.oldRenderVdom = renderVdom;
    return createDOM(renderVdom)

}
//更新props --给真实的dom上绑上新的props
function updateProps(dom, oldProps = {}, newProps = {}) {
    for (const key in newProps) {
        if (key === 'children') {
            continue
        } else if (key === 'style') {
            let styleObj = newProps[key]
            for (const attr in styleObj) {
                dom.style[attr] = styleObj[attr]
            }
        } else if (key.startsWith('on')) {
            // /^on[A-Z].*/.test(key)
            // dom[key.toLowerCase()] = newProps[key];
            addEvent(dom, key.toLocaleLowerCase(), newProps[key]);
        } else {
            dom[key] = newProps[key];
        }
    }
    for (const key in oldProps) {
        if (!newProps.hasOwnProperty(key)) {
            dom[key] = null
        }
    }
}
//找到真实dom
export function findDOM(vdom) {
    if (!vdom) return null;
    if (vdom.dom) {
        return vdom.dom;
    } else {
        let renderVdom = vdom.classInstance ? vdom.classInstance.oldRenderVdom : vdom.oldRenderVdom;
        return findDOM(renderVdom);
    }
}
//卸载虚拟dom以及真实dom
function unMountVdom(vdom) {
    // debugger
    let { props, ref } = vdom;
    let currentDOM = findDOM(vdom);//获取此虚拟DOM对应的真实DOM
    //vdom可能是原生组件span 类组件 classComponent 也可能是函数组件Function
    if (vdom.classInstance && vdom.classInstance.componentWillUnmount) {
        vdom.classInstance.componentWillUnmount();
    }
    if (ref) {
        ref.current = null;
    }
    //如果此虚拟DOM有子节点的话，递归全部删除
    if (props.children) {
        //得到儿子的数组
        let children = Array.isArray(props.children) ? props.children : [props.children];
        children.forEach(unMountVdom);
    }
    //把自己这个虚拟DOM对应的真实DOM从界面删除
    if (currentDOM) currentDOM.remove();
}
//虚拟Dom对比
export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {
    // let oldDOM = findDOM(oldVdom);
    // let newDOM = createDOM(newVdom);
    // parentDOM.replaceChild(newDOM, oldDOM);
    // debugger
    if (!oldVdom && !newVdom) {
        //老和新都是没有
        return;
    } else if (!!oldVdom && !newVdom) {
        //老有新没有
        unMountVdom(oldVdom);
    } else if (!oldVdom && !!newVdom) {
        //老没有新的有
        let newDOM = createDOM(newVdom);
        if (nextDOM) {
            parentDOM.insertBefore(newDOM, nextDOM);
        } else {
            parentDOM.appendChild(newDOM);
        }
        if (newDOM.componentDidMount) {
            newDOM.componentDidMount();
        }
        return
    } else if (!!oldVdom && !!newVdom && oldVdom.type !== newVdom.type) {
        //新老都有，但类型不同
        //  debugger
        let newDOM = createDOM(newVdom);
        unMountVdom(oldVdom);
        if (newDOM.componentDidMount) newDOM.componentDidMount();
    } else {
        updateElement(oldVdom, newVdom);
    }
}
//更新元素
function updateElement(oldVdom, newVdom) {
    if (oldVdom.type === REACT_TEXT) {
        let currentDOM = newVdom.dom = findDOM(oldVdom);
        if (oldVdom.props !== newVdom.props) {
            currentDOM.textContent = newVdom.props;
        }
        return;
    } else if (typeof oldVdom.type === 'string') {
        let currentDOM = newVdom.dom = findDOM(oldVdom);
        updateProps(currentDOM, oldVdom.props, newVdom.props);
        updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
    } else if (oldVdom.type === REACT_FRAGMENT) {
        let currentDOM = newVdom.dom = findDOM(oldVdom);
        updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
    } else if (typeof oldVdom.type === 'function') {
        if (oldVdom.type.isReactComponent) {
            updateClassComponent(oldVdom, newVdom);
        } else {
            updateFunctionComponent(oldVdom, newVdom);
        }
    }

}
//更新函数组件
function updateFunctionComponent(oldVdom, newVdom) {
    let currentDOM = findDOM(oldVdom);
    if (!currentDOM) return;
    let parentDOM = currentDOM.parentNode;
    let { type, props } = newVdom;
    let newRenderVdom = type(props);
    compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, newRenderVdom);
    newVdom.oldRenderVdom = newRenderVdom;
}
//更新类组件
function updateClassComponent(oldVdom, newVdom) {
    let classInstance = newVdom.classInstance = oldVdom.classInstance;
    if (classInstance.componentWillReceiveProps) {
        classInstance.componentWillReceiveProps(newVdom.props);
    }
    classInstance.updater.emitUpdate(newVdom.props);
}
//更新子组件
function updateChildren(parentDOM, oldVChildren, newVChildren) {
    // 这2个是更新子组件生命周期的
    // oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren]
    // newVChildren = Array.isArray(newVChildren) ? newVChildren : [newVChildren]
    // let maxLength = Math.max(oldVChildren.length, newVChildren.length);
    // for (let i = 0; i < maxLength; i++) {
    //     let nextVdom = oldVChildren.find((item, index) => index > i && item && findDOM(item));
    //     compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i], nextVdom && findDOM(nextVdom));
    // }
    //下面是diff的
    oldVChildren = ( Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren]).filter(item => item) || [];
    newVChildren = ( Array.isArray(newVChildren) ? newVChildren : [newVChildren]).filter(item => item) || [];
    let keyedOldMap = {};
    let lastPlacedIndex = 0;
    oldVChildren.forEach((oldVChild, index) => {
        let oldKey = oldVChild.key ? oldVChild.key : index;
        keyedOldMap[oldKey] = oldVChild;
    })
    let patch = [];
    newVChildren.forEach((newVChild, index) => {
        newVChild.mountIndex = index;
        let newKey = newVChild.key ? newVChild.key : index;
        let oldVChild = keyedOldMap[newKey];
        if (oldVChild) {
            updateElement(oldVChild, newVChild);//还会继续掉用updateChildren
            if (oldVChild.mountIndex < lastPlacedIndex) {
                patch.push({
                    type: MOVE,
                    oldVChild,
                    newVChild,
                    mountIndex: index
                })
            }
            delete keyedOldMap[newKey];
            lastPlacedIndex = Math.max(lastPlacedIndex, oldVChild.mountIndex);
        }else{
                patch.push({
                    type: PLACEMENT,
                    newVChild,
                    mountIndex: index
                });
        }
    })
    let moveVChild = patch.filter(action => action.type === MOVE).map(action => action.oldVChild);
    Object.values(keyedOldMap).concat(moveVChild).forEach((oldVChild) => {
        let currentDOM = findDOM(oldVChild);
        parentDOM.removeChild(currentDOM);
    })
    patch.forEach(action => {
        let { type, oldVChild, newVChild, mountIndex } = action;
        let childNodes = parentDOM.childNodes;
        if (type === PLACEMENT) {
            let newDOM = createDOM(newVChild);
            let childNode = childNodes[mountIndex];
            if (childNode) {
                parentDOM.insertBefore(newDOM, childNode);
            } else {
                parentDOM.appendChild(newDOM);
            }
        }else if (type === MOVE) {
            let oldDOM = findDOM(oldVChild);
            let childNode = childNodes[mountIndex];
            if (childNode) {
                parentDOM.insertBefore(oldDOM, childNode);
            } else{
                parentDOM.appendChild(oldDOM);
            }
        }
    })
}
//子组件递归
function reconcileChildren(childrenVdom, parentDOM) {
    for (let i = 0; i < childrenVdom.length; i++) {
        childrenVdom[i].mountIndex = i;
        mount(childrenVdom[i], parentDOM)
    }
}
const ReactDOM = {
    render,
};
export default ReactDOM;