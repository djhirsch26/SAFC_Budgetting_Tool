import {
  ADD_DURABLE,
  ADD_TRAVEL,
  ADD_ADMIN,
  ADD_LOCAL,
  LOAD
} from '../actions'

import {writeBudget} from '../utils/fs_helpers'

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
    writeBudget({...state, ...temp})
    return {...state, ...temp}
  case ADD_TRAVEL:
    writeBudget({...state, travel: action.payload.travel})
    return {...state, travel: action.payload.travel}
  case ADD_ADMIN:
    writeBudget({...state, admin: action.payload.admin})
    return {...state, admin: action.payload.admin}
  case ADD_LOCAL:
    writeBudget({...state, local: action.payload.local})
    return {...state, admin: action.payload.local}
  case LOAD:
    return {...state, ...action.payload}
	default:
		return state;
	}
}
