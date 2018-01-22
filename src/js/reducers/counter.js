import { INCREMENT, DECREMENT } from '../actions/app.js';

const app = (state = {clicks: 0, value: 0}, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        clicks: state.clicks + 1,
        value: state.value + 1
      }
    case DECREMENT:
      return {
        ...state,
        clicks: state.clicks + 1,
        value: state.value - 1
      }
    default:
      return state;
  }
}

export default app;
