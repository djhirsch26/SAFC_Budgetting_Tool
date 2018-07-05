export const OPEN_COLLAPSE = 'open-collapse'
export const CLOSE_COLLAPSE = 'close-collapse'
export const ADD_COLLAPSE = 'add-collapse'
export const REMOVE_COLLAPSE = 'remove-collapse'
export const INIT = 'init'
export const UPDATE_INVALID = 'update-invalid'


export function addCollapse(formName, fieldName, index, isInit=true) {
  return {
    type: ADD_COLLAPSE,
    payload: {form: formName, field: fieldName, index: index, isInit: isInit}
  }
}

export function init(field) {
  return {
    type: INIT,
    payload: {field}
  }
}

export function removeCollapse(formName, fieldName, index) {
  return {
    type: REMOVE_COLLAPSE,
    payload: {form: formName, field: fieldName, index: index}
  }
}

export function openCollapse(formName, fieldName, index) {
  return {
    type: OPEN_COLLAPSE,
    payload: {form: formName, field: fieldName, index: index}
  }
}

export function updateInvalids(formName, invalids) {
  return {
    type: UPDATE_INVALID,
    payload: {form: formName, invalids: invalids}
  }
}

export function closeCollapse(formName, fieldName, index) {
  return {
    type: CLOSE_COLLAPSE,
    payload: {form: formName, field: fieldName, index: index}
  }
}
