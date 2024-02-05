function createStore(reducer, preloadedState, enhancer) {
    if (typeof enhancer !== 'undefined') {
        return enhancer(createStore)(reducer, preloadedState);
    }
    let state = preloadedState;
    let listeners = [];
    function getState() {
        return state
    }
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(l => l());
        return action
    }
    function subscribe(listener) {
        listeners.push(listener);
        return () => {
            listeners.filter(l => l !== listener)
        }
    }
    dispatch({ type: '@@REDUX/INIT' });
    return {
        getState,
        dispatch,
        subscribe,
    }
}
export default createStore;