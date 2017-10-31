import {
    EDIT_RULE_SUCCESS,
    GET_RULES_SUCCESS,
    ADD_RULE_SUCCESS,
    REMOVE_RULE_SUCCESS,
    SET_RULES
} from '../utils/actiontypes.js';

const initialState = [];

export default function rules (state = initialState, action) {
    let output = state;

    switch (action.type) {
        case SET_RULES:
            output = '';

            if (action.payload != '' && action.payload.length) {
                output = JSON.parse(action.payload, (key, value) => {
                    if (key === 'is_active') {
                        value = Boolean(value);
                    }

                    return value;
                });
            }

            break;

        case GET_RULES_SUCCESS:
            output = action.payload;
            break;

        case EDIT_RULE_SUCCESS: 
            output = action.payload;
            break;

        case ADD_RULE_SUCCESS:
            output = action.payload;
            break;

        case REMOVE_RULE_SUCCESS:
            output = action.payload;

            if(action.payload == '') {
                output = [];
            }

            break;
    }
    return output;
}
