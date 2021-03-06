import 'unfetch/polyfill';
import urls from '../lib/urls';

export const NAVIGATE = 'NAVIGATE';
export const DATA_LOADING = 'DATA_LOADING';
export const DATA_LOADED = 'DATA_LOADED';
export const DATA_ERROR = 'DATA_ERROR';
export const SET_DATA = 'SET_DATA';

export const navigate = (path) => {
  return {
    type: NAVIGATE,
    path
  };
};

export const dataLoading = () => {
  return {
    type: DATA_LOADING
  };
};

export const dataLoaded = (url, data, page, expiry) => {
  return {
    type: DATA_LOADED,
    url,
    data,
    page,
    expiry
  };
};

export const dataError = (errMsg) => {
  return {
    type: DATA_ERROR,
    errMsg
  };
};

export const setData = (data) => {
  return {
    type: SET_DATA,
    data
  };
};


export const loadApi = (url, page, id) => {
  return dispatch => {
    dispatch(dataLoading())
    fetch(urls[url](page, id))
      .then(res => res.json())
      .then(res => {
        dispatch(dataLoaded(url, res, page, Date.now() + (1e3 * 60 * 5), id))
      })
      .catch(e => {
        dispatch(dataError(e.message))
      });
  };
}
