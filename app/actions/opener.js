export const OPEN_COLLAPSE = 'open-collapse'
export const CLOSE_COLLAPSE = 'close-collapse'
export const ADD_COLLAPSE = 'add-collapse'
export const REMOVE_COLLAPSE = 'remove-collapse'
export const INIT = 'init'
export const UDPATE_ERRORS = 'update-errors'

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

export function repeatErrors(errors) {
  return: UDPATE_ERRORS,
  payload: {errors}
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

export function closeCollapse(formName, fieldName, index) {
  return {
    type: CLOSE_COLLAPSE,
    payload: {form: formName, field: fieldName, index: index}
  }
}
