import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './components/App';
import GamesPage from './components/GamesPage'
import GamesForm from './components/GamesForm'
import registerServiceWorker from './registerServiceWorker';

import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

const store = createStore(rootReducer, applyMiddleware(logger,thunk))

ReactDOM.render( 
    <Provider store={ store }>
        <Router>
            <div className="ui container">
                <div className="ui three item menu">
                    <NavLink exact activeClassName="active" className="item" to="/">Home</NavLink>
                    <NavLink exact activeClassName="active" className="item" to="/games">Games</NavLink>
                    <NavLink activeClassName = "active" className = "item" to = "/games/new" > Add New Game </NavLink>
                </div> 
                <Route exact path="/" component={App}/>
                <Route exact path="/games" component={ GamesPage } />
                <Route path="/games/new" component={ GamesForm } />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker()