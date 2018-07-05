import {
  ADD_DURABLE,
  ADD_TRAVEL
} from '../actions'

import {DURABLE} from '../constants'

var initialState = {
  travel: {},
  local: {}
}

initialState[DURABLE] = {}

export default function(state=initialState, action) {
	switch(action.type) {
  case ADD_DURABLE:
    var temp = {}
    temp[DURABLE] = action.payload[DURABLE]
    return {...state, ...temp}
  case ADD_TRAVEL:
    return {...state, travel: action.payload.travel}
	default:
		return state;
	}
}
