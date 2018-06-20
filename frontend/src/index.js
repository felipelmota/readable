import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>, document.getElementById('root'));

registerServiceWorker();
