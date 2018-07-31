

export const numeric = function(value, previousValue=0) {
  if(!isNaN(value) && parseFloat(value)>=0 && value!='') {
    return value
  }
  return value=='' ? value : previousValue
}

export const monetary = function(value) {
  if (value || value==0) {
    return '$' + value
  }
  return value
}
