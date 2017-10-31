import {
    getRulesSuccess,
    editRuleSuccess, 
    addRuleSuccess,
    removeRuleSuccess,
    startFetching,
    setRulesForProject,
    endFetching
} from '../utils/actiontypes.js';

import parser from '../utils/parser.js';

import { addNewRule, editExistingRule, removeRule } from '../utils/Api.js';

const fetching = {
    start: startFetching(),
    end: endFetching()
};

export const getRulesMiddleware = (landingId) => dispatch => {
    setTimeout(() => {
        let rules = mockRules.find(item => item.id === landingId).items.slice();

        dispatch(getRulesSuccess(parser(rules)));
    }, 500);
};

export const createRuleMiddleware = (newRule) => dispatch => {
    dispatch(fetching.start);

    setTimeout(() => {
        addNewRule(newRule, data => {
            dispatch(addRuleSuccess(data));
            dispatch(fetching.end);
        });
    }, 500);
};

export const editRuleMiddleware = (newRule) => dispatch => {
    dispatch(fetching.start);

    setTimeout(() => {
        editExistingRule(newRule, data => {
            dispatch(editRuleSuccess(data));
            dispatch(fetching.end);
        });
    }, 500);
};

export const removeRuleMiddleware = (payload) => dispatch => {
    dispatch(fetching.start);

    setTimeout(() => {
        removeRule(payload, data => {
            dispatch(setRulesForProject({
                rules: data, 
                projectID: payload.projectID
            }));
            dispatch(removeRuleSuccess(data));
            dispatch(fetching.end);
        });
    }, 500);
};
