import axios from 'axios';
import config from '../config/config';

export const get = (path, params) => {
  const url = `${config.apiUrl}${path}`;

  return axios({
    method: 'get',
    url,
    params,
    withCredentials: true,
  }).then(resp => resp.data);
};

export const post = (path, data, params) => {
  const url = `${config.apiUrl}${path}`;

  return axios({
    method: 'post',
    url,
    data,
    params,
    withCredentials: true,
  });
};

export const put = (path, data, params) => {
  const url = `${config.apiUrl}${path}`;

  return axios({
    method: 'put',
    url,
    data,
    params,
    withCredentials: true,
  });
};

export const deleteRequest = (path, data, params) => {
  const url = `${config.apiUrl}${path}`;

  return axios({
    method: 'delete',
    url,
    data,
    params,
    withCredentials: true,
  });
};
