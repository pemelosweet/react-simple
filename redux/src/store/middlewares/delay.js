function delay() {
    return  function (next) {//调用原始的store.dispatch
        return function (action) {
            setTimeout(() => {
                next(action);
            }, 1000);
        }
    }
}
export default delay