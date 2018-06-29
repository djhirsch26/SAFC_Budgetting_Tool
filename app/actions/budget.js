export const ADD_DURABLE = 'add-durable'
export const ADD_TRAVEL = 'add-travel'

export function addDurable(durables) {
  return {
    type: ADD_DURABLE,
    payload: {durable: durables}
  }
}

export function addTravel(travel) {
  return {
    type: ADD_TRAVEL,
    payload: {travel: travel}
  }
}
