import React, { Component } from 'react';
import { Provider } from 'react-redux'
import './App.css';
import store from './store'
import Router from './routes/router'
if (process.env.NODE_ENV !== 'production') {
    require('./mock')
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}

export default App;
