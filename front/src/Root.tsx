import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import 'normalize.css'

const Root = ({store}) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Route path="/" component={App}/>
            </BrowserRouter>
        </Provider>
    );
};

export default Root;