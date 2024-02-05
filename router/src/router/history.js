const Action = {
    Pop: 'POP',
    Push: 'PUSH'
}
const PopStateEventType = 'popstate';
let action = Action.Pop;
export function createHashHistory() {
    if (!window.location.hash) {
        window.location.hash='/';
    }
    function getHashLocation(window,globalHistory) { 
        const { pathname } = window.location;
        const state = globalHistory.state || {};
        return { pathname, state:state };  
    }
    function createHashHref(to){
        let url = window.location.href;
        let hashIndex = url.indexOf('#');
        let href  = hashIndex==-1?url:url.slice(0,hashIndex);
        return href+'#'+to;
    }
    return  getUrlBasedHistory(getHashLocation,createHashHref)
}

export function createBrowserHistory() {
    function getBrowserLocation(window,globalHistory) { 
        const { pathname } = window.location;
        const state = globalHistory.state || {};
        return { pathname, state:state };  
    }
    function createBrowserHref(to){
        return to;
    }
    return  getUrlBasedHistory(getBrowserLocation,createBrowserHref)
}

function getUrlBasedHistory(getLocation,createHref) {
    const globalHistory = window.history;
    let listener = null;
    function handlePop() {
        action = Action.Pop;
        if(listener){
            listener({location:history.location});
        }
    }
    function push(to,state) {
        action = Action.Push;
        const url = createHref(to);
        globalHistory.pushState(state,'',url);
        if(listener){
            listener({location:history.location});
          }
    }
     let history ={
        get action() {
            return action;
        },
        get location() {
            return getLocation(window, globalHistory);
        },
        push,
        listen(fn){
            window.addEventListener(PopStateEventType,handlePop);
            listener=fn;
            return ()=>{
                window.removeEventListener(PopStateEventType,handlePop);
                listener = null;
            }
        },
        go(n){
            return globalHistory.go(n);
        }
     }
     window.his = history;
     return history;

}