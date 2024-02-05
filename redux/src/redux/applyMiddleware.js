// function applyMiddleware1(logger) {
// return function (createStore) {
//     return function (reducer) {
//         const store =createStore(reducer)
//         const  middlewareAPI ={getState:store.getState};
//         const newDispatch =logger(middlewareAPI)(store.dispatch)
//         store.dispatch = newDispatch;
//         return store;
//     }
// }
// }
import compose from './compose';
function applyMiddleware(...middlewares) {
    return function(createStore) {
        return function (reducer,preloadedState) {
            let store = createStore(reducer,preloadedState);
            let dispatch;
            let middlewareAPI = {
                getState: store.getState,
                dispatch: (action) => dispatch(action)
            }
            let chain = middlewares.map(middleware => middleware(middlewareAPI));
            dispatch = compose(...chain)(store.dispatch);
            return {
                ...store,
                dispatch
            }
        }
    }
}
export default applyMiddleware
