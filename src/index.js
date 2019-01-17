import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import createStore from './store';
import { initialState } from './helpers/initialState';
import './assets/style/master.css';

const asyncRender = async () => {

    const boo = await initialState();

    ReactDOM.render((
        <Provider store={createStore(boo)}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    ), document.getElementById('root'))
    registerServiceWorker();

} 
asyncRender();




