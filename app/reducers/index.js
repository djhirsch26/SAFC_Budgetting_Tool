// @flow
import { createStore, combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  router,
  form: formReducer
});

const store = createStore(rootReducer)

export default rootReducer;
