import { CHOOSE_RULE } from '../utils/actiontypes.js';

const initialState = {};

export default function currentRule (state = initialState, action) {
    switch (action.type) {
        case CHOOSE_RULE:
            return action.payload;

        default:
            return state;
    }
}
