import { NAVIGATE } from '../actions/app.js';

function getParams() {
  let out = {};

  location.search.substr(1).split('&').forEach(parts => {
      let values = parts.split('=');
      out[values[0]] = values[1];
  });

  return out
}
function getPage() {
  const out = getParams()
  const parsedPageNumber = parseInt(out.page, 10);
  let pageNumber = isNaN(parsedPageNumber) ? 1 : parsedPageNumber;

  if (pageNumber < 1) pageNumber = 1;
  if (pageNumber > 30) pageNumber = 30;
  return pageNumber;
}

const app = (state = {}, action) => {
  switch (action.type) {
    case NAVIGATE:
      const location = action.path;
      const url = window.decodeURIComponent(location.pathname);
      const page = getPage()
      if (url !== '/item') {
        window.history.replaceState({}, '', `${url}?page=${page}`);
      }
      window.scrollTo(0, 0)
      return {
        ...state,
        url,
        page,
        id: getParams().id
      };
    default:
      return state;
  }
}

export default app;
