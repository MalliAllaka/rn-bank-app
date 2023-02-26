import axios from 'axios';
import jsog from 'jsog';

export const apiBaseUrl = 'http://192.168.150.101:7777';

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

api.interceptors.response.use(
  function (response) {
    response.data = jsog.decode(response.data);

    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

const toParam = (params) => {
  var esc = encodeURIComponent;
  var query = Object.keys(params)
    .map((k) => esc(k) + '=' + esc(params[k]))
    .join('&');
  // console.log('query------>' + query);
  return query;
};

export { api, toParam };
