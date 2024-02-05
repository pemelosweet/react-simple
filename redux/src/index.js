import React from 'react';
import ReactDOM from 'react-dom/client';
import Counter3 from './components/Counter3';
import Counter4 from './components/Counter4';
import store from './store';
import { Provider } from './react-redux';
ReactDOM.createRoot(document.getElementById('root'))
.render(
    <Provider store={store}>
        <Counter3/>
        <Counter4/>
    </Provider>
);