import { 
    START_FETCHING,
    END_FETCHING
} from '../utils/actiontypes.js';

const initialState = false;

export default function isFetching (state = initialState, action) {
    switch (action.type) {
        case START_FETCHING:
            return true;

        case END_FETCHING :
            return false;

        default:
            return state;
    }
}
