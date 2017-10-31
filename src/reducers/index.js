import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import currentProject from './currentProject.js';
import scrollbarwidth from './scrollbar.js';
import currentRule from './currentRule.js';
import isFetching from './isFetching.js';
import landings from './landings.js';
import rules from './rules.js';

export default combineReducers({
    routing: routerReducer,
    scrollbarwidth,
    currentProject,
    currentRule,
    isFetching,
    landings,
    rules
});
