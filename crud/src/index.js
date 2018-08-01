import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import { createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers/index';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import App from './components/App'
import GamesPage from './components/GamesPage'
import GamesFormPage from './components/GamesFormPage'

const store = createStore(rootReducer,applyMiddleware(logger,thunk))
ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <div className="ui container">
                <div className="ui three item menu">
                    <NavLink exact activeClassName="active" className="item" to="/">Home</NavLink>
                    <NavLink exact activeClassName="active" className="item" to="/games">Games</NavLink>
                    <NavLink activeClassName="active" className="item" to="/games/new">Add New Page</NavLink>
                </div>
                <Route exact path="/" component={ App }/>
                <Route exact path="/games" component={ GamesPage }/>
                <Route path="/games/new" component={ GamesFormPage }/>
                <Route path="/game/:_id" component={ GamesFormPage }/>
            </div>
        </Router>

    </Provider>,
    document.getElementById("root")
)