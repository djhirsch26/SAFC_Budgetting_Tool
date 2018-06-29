import {
  ADD_DURABLE,
  ADD_TRAVEL
} from '../actions'

var initialState = {
  durable: {},
  travel: {},
  local: {}
}

export default function(state=initialState, action) {
	switch(action.type) {
  case ADD_DURABLE:
    return {...state, durable: action.payload.durable}
  case ADD_TRAVEL:
    return {...state, travel: action.payload.travel}
	default:
		return state;
	}
}
