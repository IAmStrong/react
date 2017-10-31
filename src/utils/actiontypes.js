export const REMOVE_LANDING_SUCCESS = 'REMOVE_LANDING_SUCCESS';
export const GET_LANDINGS_SUCCESS = 'GET_LANDINGS_SUCCESS';
export const EDIT_LANDING_SUCCESS = 'EDIT_LANDING_SUCCESS';
export const ADD_LANDING_SUCCESS = 'ADD_LANDING_SUCCESS';

export const REMOVE_RULE_SUCCESS = 'REMOVE_RULE_SUCCESS';
export const EDIT_RULE_SUCCESS = 'EDIT_RULE_SUCCESS';
export const ADD_RULE_SUCCESS = 'ADD_RULE_SUCCESS';
export const GET_RULE_SUCCESS = 'GET_RULE_SUCCESS';
export const SET_RULES = 'SET_RULES';

export const START_FETCHING = 'START_FETCHING';
export const END_FETCHING = 'END_FETCHING';

export const SET_RULES_FOR_PROJECT = 'SET_RULES_FOR_PROJECT';
export const SET_SCROLLBAR_WIDTH = 'SET_SCROLLBAR_WIDTH';
export const CHOOSE_PROJECT = 'CHOOSE_PROJECT';
export const CHOOSE_RULE = 'CHOOSE_RULE';

// ---- :: Projects :: ---

export const editLandingSuccess = (payload) => {
    return {
        type: EDIT_LANDING_SUCCESS,
        payload
    }
}

export const addLandingSuccess = (payload) => {
    return {
        type: ADD_LANDING_SUCCESS,
        payload
    }
}

export const removeLandingSuccess = (payload) => {
    return {
        type: REMOVE_LANDING_SUCCESS,
        payload
    }
}

export const getLandingsSuccess = (payload) => {
    return {
        type: GET_LANDINGS_SUCCESS,
        payload
    }
}

// ---- :: Rules :: ----

export const editRuleSuccess = (payload) => {
    return {
        type: EDIT_RULE_SUCCESS,
        payload
    }
}

export const addRuleSuccess = (payload) => {
    return {
        type: ADD_RULE_SUCCESS,
        payload
    }
}

export const removeRuleSuccess = (payload) => {
    return {
        type: REMOVE_RULE_SUCCESS,
        payload
    }
}

export const getRulesSuccess = () => {
    return {
        type: GET_RULE_SUCCESS
    }
}

export const setRules = (payload) => {
    return {
        type: SET_RULES,
        payload
    }
}

// ---- :: Utils :: ----

export const startFetching = () => {
    return {
        type: START_FETCHING
    }
}

export const endFetching = () => {
    return {
        type: END_FETCHING
    }
}


export const chooseProject = (payload) => {
    return {
        type: CHOOSE_PROJECT,
        payload
    }
}

export const setRulesForProject = (payload) => {
    return {
        type: SET_RULES_FOR_PROJECT,
        payload
    }
}

export const chooseRule = (payload) => {
    return {
        type: CHOOSE_RULE,
        payload
    }
}

export const setScrollbarWidth = (payload) => {
    return {
        type: SET_SCROLLBAR_WIDTH,
        payload
    }
}
