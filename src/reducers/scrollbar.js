import {
    setScrollbarWidth,
    SET_SCROLLBAR_WIDTH
} from '../utils/actiontypes.js';

const initialState = 0;

export default function scrollbarwidth (state = initialState, action) {
    switch (action.type) {
        case SET_SCROLLBAR_WIDTH:
            const projectsNum = action.payload.projectsLen;
            const maxWidth = 100;
            const numberOfItemsShown = action.payload.numberOfItemsShown;
            const beginIndex = action.payload.beginIndex;

            const width = (beginIndex * maxWidth) / 
                (projectsNum - numberOfItemsShown);

            return width;

        default:
            return state;
    }
}
