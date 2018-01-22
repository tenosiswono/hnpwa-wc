import { createStore, origCompose, applyMiddleware } from '@0xcda7a/redux-es6';
import thunk from 'redux-thunk';

import { lazyReducerEnhancer } from './lib/lazyReducerEnhancer.js'
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose;

export const store = createStore(
  (state, action) => state,
  compose(lazyReducerEnhancer),
  applyMiddleware(thunk)
);

// Initially loaded reducers.
import app from './reducers/app.js';
import counter from './reducers/counter.js';
store.addReducers({
  app, counter
});
