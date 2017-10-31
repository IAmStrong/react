import fetchData from '../utils/fetchData.js';

import {
    removeLandingSuccess,
    getLandingsSuccess,
    editLandingSuccess,
    addLandingSuccess,
    startFetching,
    endFetching
} from '../utils/actiontypes.js';

import {
    editExistingProject,
    addNewProject,
    removeProject
} from '../utils/Api.js';

const fetching = {
    start: startFetching(),
    end: endFetching()
};

export const getLandingsMiddleware = () => dispatch => {
    dispatch(fetching.start);

    setTimeout(() => {
        fetchData((data) => {
            dispatch(getLandingsSuccess(data));
            dispatch(fetching.end);
        });
    }, 500);
};

export const addProjectMiddleWare = (newProject) => dispatch => {
    dispatch(fetching.start);

    setTimeout(() => {
        addNewProject(newProject, (data) => {
            dispatch(addLandingSuccess(data));
            dispatch(fetching.end);            
        });
    }, 500);
};

export const removeProjectMiddleWare = (projectID) => dispatch => {
    dispatch(fetching.start);

    setTimeout(() => {
        removeProject(projectID, (data) => {
            dispatch(removeLandingSuccess(data));
            dispatch(fetching.end);
        });
    }, 500);
};

export const editProjectMiddleWare = (payload) => dispatch => {
    dispatch(fetching.start);

    setTimeout(() => {
        editExistingProject ((payload), data => {
            dispatch(editLandingSuccess(data));
            dispatch(fetching.end);       
        });
    }, 500);
};
