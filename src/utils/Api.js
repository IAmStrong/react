import axios from 'axios';

import {currentHost, apiLinks} from './settings.js';
import parser from './parser.js';

export const logoutRequest = () => {
    return (
        axios.get(apiLinks.logout[currentHost]).then(function (response) {
            location.reload();
        })
    );
};

export const addNewProject = (data, callback) => {
    const type = {type: 'add_project'};

    return (
        axios.post(apiLinks.actions[currentHost], {...type, data})
            .then(function (response) {
                callback(parser(response.data));
            })
    );
};

export const editExistingProject = (data, callback) => {
    const type = {type: 'edit_project'};

    return (
        axios.post(apiLinks.actions[currentHost], {...type, data})
            .then(function (response) {
                callback(parser(response.data));
            })
    );
};

export const removeProject = (id, callback) => {
    const type = {type: 'delete_project'};

    return (
        axios.post(apiLinks.actions[currentHost], {...type, id})
            .then(function (response) {
                callback(response.data);
            })
    );
};

export const addNewRule = (rawData, callback) => {
    const type = 'add_rule';
    const  formData = new FormData();

    formData.append('file',rawData.file);
    formData.append('type', type);
    formData.append('data', JSON.stringify(rawData));

    return (
        axios.post(apiLinks.actions[currentHost], formData)
            .then(function (response) {
                callback(response.data);
            })
    );
};

export const editExistingRule = (rawData, callback) => {
    const type = 'edit_rule';
    const  formData = new FormData();

    formData.append('file',rawData.file);
    formData.append('type', type);
    formData.append('data', JSON.stringify(rawData));

    return (
        axios.post(apiLinks.actions[currentHost], formData)
            .then(function (response) {
                callback(response.data);
            })
    );
};

export const removeRule = (data, callback) => {
    const type = {type: 'delete_rule'};

    return (
        axios.post(apiLinks.actions[currentHost], {...type, data })
            .then(function (response) {
                callback(response.data);
            })
    );
};
