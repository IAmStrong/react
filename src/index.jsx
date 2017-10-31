import React from 'react';
import ReactDOM from 'react-dom';

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import reducer from './reducers';

import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import SelectProject from './containers/SelectProject.jsx';
import RulesPage from './containers/RulesPage.jsx';

/* Production Mode */

const mode = process.env.NODE_ENV;
const notInProduction = mode !== 'production';
const message = ':: Looks like we are in development mode! ::';

if (notInProduction) console.log(message);

/* End Production Mode */

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)) 
);

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
    <Provider store = { store }>
        <MuiThemeProvider>
            <Router history = { history }>
                <Route path = '/' component = { SelectProject } />
                <Route path = '/project/:id' component = { RulesPage } />
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);
