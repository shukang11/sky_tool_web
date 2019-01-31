import React, { Component } from 'react';
import './App.css';
import {
    Route,
    HashRouter as Router,
    Switch
} from 'react-router-dom'

import HomeComp from "./components/home";
import LoginComp from "./pages/login";
import NotFoundComp from "./pages/notFound";

import rootReducer from './reducers'
import TodoList from './components/todoComp'

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                <Switch>
                    <Route path='/login' component={LoginComp}/>
                    <Route path='/404' component={NotFoundComp}/>
                    <Route path='/app' component={HomeComp}/>
                    <Route path='/todo' component={TodoList}/>
                </Switch>
            </Router>
            </Provider>
        );
    }
}

export default App;
