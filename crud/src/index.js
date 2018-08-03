import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import App from './components/App'
import GamesPage from './components/GamesPage'
import GameForm from './components/GameForm'

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(logger, thunk )))

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <div className="ui container">
                <div className="ui three item menu">
                    <NavLink exact to="/" activeClassName="active" className="item">Home</NavLink>
                    <NavLink exact to="/games" activeClassName="active" className="item">Games</NavLink>
                    <NavLink to="/games/new" activeClassName="active" className="item">Add New Game</NavLink>
                </div>
                <Route exact path="/" component={ App }/>
                <Route exact path="/games" component={ GamesPage }/>
                <Route path="/games/new" component={ GameForm }/>
                <Route path="/game/:_id" component={ GameForm }/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
)