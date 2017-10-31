import axios from 'axios';

import { currentHost, apiLinks } from './settings.js';
import parser from './parser.js';

const fetchData = (callback) => {
    const type = {type: 'get_all_projects'};

    return (
        axios.post(apiLinks.actions[currentHost], type)
            .then(function (response) {
                callback(parser(response.data));
            })
    );
};

export default fetchData;
