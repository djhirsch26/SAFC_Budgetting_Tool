export const ADD_FILE = 'add-file'

export function addFile(form, field, value) {
  return {
    type: ADD_FILE,
    payload: dispatch(change(form, field, value))
  }
}
