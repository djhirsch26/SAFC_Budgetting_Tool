export const ADD_DURABLE = 'add-durable'
export const ADD_TRAVEL = 'add-travel'

import {DURABLE} from '../constants'

export function addDurable(durables) {
  var payload = {}
  payload[DURABLE] = durables
  return {
    type: ADD_DURABLE,
    payload: {...payload}
  }
}

export function addTravel(travel) {
  return {
    type: ADD_TRAVEL,
    payload: {travel: travel}
  }
}
