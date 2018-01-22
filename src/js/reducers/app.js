import { NAVIGATE } from '../actions/app.js';

const app = (state = {}, action) => {
  switch (action.type) {
    case NAVIGATE:
      const location = action.path;
      const page = window.decodeURIComponent(location.pathname);
      return {
        ...state,
        page: page
      };
    default:
      return state;
  }
}

export default app;
