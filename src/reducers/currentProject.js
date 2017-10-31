import {
    CHOOSE_PROJECT,
    SET_RULES_FOR_PROJECT
} from '../utils/actiontypes.js';

const initialState = {};

export default function currentProject (state = initialState, action) {
    switch (action.type) {
        case CHOOSE_PROJECT:
            return action.payload;

        default:
            return state;
    }
}
