export const OPEN_COLLAPSE = 'open-collapse'
export const CLOSE_COLLAPSE = 'close-collapse'
export const ADD_COLLAPSE = 'add-collapse'
export const REMOVE_COLLAPSE = 'remove-collapse'
export const INIT = 'init'
export const UDPATE_ERRORS = 'update-errors'
export const ADD_ERRORS = 'add-errors'
export const REMOVE_ERRORS = 'remove-errors'

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

export function addErrors(formName, repeatableName, index, length) {
  return{
    type: ADD_ERRORS,
    payload: {form: formName, field: repeatableName, index: index, length: length}
  }
}

export function updateErrors(formName, repeatableName, index, fieldIndex, value) {
  return{
    type: UDPATE_ERRORS,
    payload: {form: formName, field: repeatableName, index: index, fieldIndex: fieldIndex, value: value}
  }
}

export function removeErrors(formName, repeatableName, index) {
  return{
    type: REMOVE_ERRORS,
    payload: {form: formName, field: repeatableName, index: index}
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

export function closeCollapse(formName, fieldName, index) {
  return {
    type: CLOSE_COLLAPSE,
    payload: {form: formName, field: fieldName, index: index}
  }
}
