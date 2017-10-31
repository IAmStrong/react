import {
    REMOVE_LANDING_SUCCESS,
    EDIT_LANDING_SUCCESS,
    GET_LANDINGS_SUCCESS,
    ADD_LANDING_SUCCESS,
    SET_RULES_FOR_PROJECT
} from '../utils/actiontypes.js';

const initialState = [];

export default function landings (state = initialState, action) {
    switch (action.type) {
        case GET_LANDINGS_SUCCESS:
            return action.payload;

        case REMOVE_LANDING_SUCCESS:
            return state.filter(item => item.id != action.payload);

        case ADD_LANDING_SUCCESS:
            return [action.payload, ...state];

        case EDIT_LANDING_SUCCESS:
            return state.map((item) => {
                let output = item;

                if (item.id === action.payload.id) {
                    output = action.payload;
                }

                return output;
            });

        case SET_RULES_FOR_PROJECT: 
            let rules = action.payload.rules;

            if (!rules.length) rules = '';

            return state.map((item) => {
                let ret = item;

                if (item.id === action.payload.projectID) {
                    ret = {
                        ...ret,
                        rules
                    };
                }

                return ret;
            });

        default:
            return state;
    }
}
