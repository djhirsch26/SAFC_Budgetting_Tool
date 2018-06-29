export const numeric = function(value, previousValue=0) {
  // console.log(value,previousValue,allValues)
  if(!isNaN(value) && value>=0) {
    return parseInt(value)
  }
  return previousValue
}

export const monetary = function(value) {
  if (value || value==0) {
    return '$' + value
  }
  return value
}
