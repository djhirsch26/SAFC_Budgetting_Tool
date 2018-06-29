// @flow
import { createStore, combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

import opener from './opener'
import budget from './budget'

const rootReducer = combineReducers({
  opener,
  router,
  form: formReducer,
  budget
});

const store = createStore(rootReducer)

export default rootReducer;
