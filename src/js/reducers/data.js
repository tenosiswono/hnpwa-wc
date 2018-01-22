import { DATA_LOADING, DATA_LOADED, DATA_ERROR } from '../actions/app.js';

export const insertData = (state, action) => {
  switch(action.type) {
    case DATA_LOADED:
      const { data, page, expiry, url } = action;
      return [
        ...state,
        {
          url,
          data,
          page,
          expiry
        }
      ];
    default:
      return state;
  }
};

const app = (state = {datas: [], errMsg: '', loading: false}, action) => {
  switch (action.type) {
    case DATA_LOADING:
      return {
        ...state,
        loading: true,
        errMsg: ''
      }
      case DATA_LOADED:
        return {
          ...state,
          datas: insertData(state.datas, action),
          loading: false,
          errMsg: ''
        }
      case DATA_ERROR:
        return {
          ...state,
          loading: false,
          errMsg: action.errMsg
        }
    default:
      return state;
  }
}

export default app;
