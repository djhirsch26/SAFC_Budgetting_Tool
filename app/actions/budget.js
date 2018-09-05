export const ADD_DURABLE = 'add-durable'
export const ADD_TRAVEL = 'add-travel'
export const ADD_ADMIN = 'add-admin'
export const ADD_LOCAL = 'add-local'
export const ADD_PUBLICATION = 'add-publication'
export const ADD_GENERAL = 'add-general'
export const LOAD = 'load'

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

export function addAdmin(admin) {
  return {
    type: ADD_ADMIN,
    payload: {admin: admin}
  }
}

export function addLocal(local) {
  return {
    type: ADD_LOCAL,
    payload: {local: local}
  }
}

export function addPublication(publication) {
  return {
    type: ADD_PUBLICATION,
    payload: {publication: publication}
  }
}

export function addGeneral(general) {
  return {
    type: ADD_GENERAL,
    payload: {general: general}
  }
}

export function loadFromFile(budget) {
  return {
    type: LOAD,
    payload: {...budget}
  }
}
