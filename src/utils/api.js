import axios from 'axios';

export const apiBaseUrl = 'http://192.168.150.100:7777';

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setApiHeaders = (token) => {
  if (token && token !== '') {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

const toParam = (params) => {
  var esc = encodeURIComponent;
  var query = Object.keys(params)
    .map((k) => esc(k) + '=' + esc(params[k]))
    .join('&');
  // console.log('query------>' + query);
  return query;
};

export { api, toParam };
