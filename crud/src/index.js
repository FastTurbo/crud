import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import rootReducer from './reducers'
import { createStore} from 'redux'

const store = createStore(rootReducer)

ReactDOM.render( 
    <Provider>
        <App/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker()