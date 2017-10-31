import  { rootFolder } from './settings.js';

const url = location.origin + '/';
const path = rootFolder && rootFolder + '/';

const host = url + path;

export default host;
