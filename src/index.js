import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './components/App'
import reducer from './reducers/index.js'
import middleware from './middleware'


const store = createStore(reducer,
    compose(
        middleware,
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ))

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
