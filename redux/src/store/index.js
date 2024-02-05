import { createStore,applyMiddleware } from '../redux';
import combinedReducer from './reducers';
import delay from './middlewares/delay';
// const store = createStore(combinedReducer, { counter1: { number: 0 }, counter2: { number: 0 } });
const store = applyMiddleware(delay)(createStore)(combinedReducer)
export default store;