import {
  ADD_DURABLE,
  ADD_TRAVEL,
  LOAD
} from '../actions'

import {
  DURABLE,
  TRAVEL,
  ADMIN,
  LOCAL,
  PUBLICATION
} from '../constants'

var initialState = {}

initialState[DURABLE] = {}
initialState[TRAVEL] = {}
initialState[ADMIN] = {}
initialState[LOCAL] = {}
initialState[PUBLICATION] = {}

export default function(state=initialState, action) {
	switch(action.type) {
  case ADD_DURABLE:
    var temp = {}
    temp[DURABLE] = action.payload[DURABLE]
    return {...state, ...temp}
  case ADD_TRAVEL:
    return {...state, travel: action.payload.travel}
  case LOAD:
    return {...state, ...action.payload}
	default:
		return state;
	}
}
