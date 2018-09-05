export function validationCreator(jsonFile) {
  return (
    function(values) {
    	const errors = {};

    	//Validate Input
      // console.log('calling validate with ', values)

      if(jsonFile.repeat) {
        jsonFile.repeat.forEach((repeatable) => {
          var name = repeatable.name
          var questions = repeatable.values
          var repeatArrayError = []
          if (values[name]) {
            values[name].forEach((item, index) => {
              var itemErrors = {}
              questions.forEach((qField) => {
                  var fieldName = qField.name
                  if(!item[fieldName] || (qField.type=='checkbox' && !item[fieldName])) {
                    if(!errors[name]) {
                      errors[name]={}
                    }
                    if(!errors[name][index]) {
                      errors[name][index]={}
                    }
                    if (qField.errorMessage) {
                      errors[name][index][fieldName]=qField.errorMessage
                    }
                  }
                  else {
                    if (qField.min) {
                      if (!isNaN(parseInt(item[fieldName])) &&  parseInt(item[fieldName]) < qField.min) {
                        if(!errors[name]) {
                          errors[name]={}
                        }
                        if(!errors[name][index]) {
                          errors[name][index]={}
                        }
                        errors[name][index][fieldName] = qField.min_error ? qField.min_error : "Minimum amount is " + qField.min
                      }
                    }
                    else if (qField.max) {
                      var illegalInt = qField.type=='number' && !isNaN(parseInt(item[fieldName])) &&  parseInt(item[fieldName]) > qField.max
                      var illegalLength = !illegalInt && String(item[fieldName]).length > qField.max
                      if (illegalInt || illegalLength) {

                        if(!errors[name]) {
                          errors[name]={}
                        }
                        if(!errors[name][index]) {
                          errors[name][index]={}
                        }

                        if (illegalInt) {
                          errors[name][index][fieldName] = qField.max_error ? qField.max_error : "Maximum amount is " + qField.max
                        }
                        if (illegalLength) {
                          errors[name][index][fieldName] = qField.max_error ? qField.max_error : "Maximum length is " + qField.max + " characters"
                        }
                      }
                    }
                  }
                })
              })
            }
          })
      }

      if (jsonFile.single) {
        jsonFile.single.forEach((question) => {
          var name = question.name
          if(values[name]==undefined) {
            errors[name] = question.errorMessage ? question.errorMessage : ""
          }
        })
      }

    	//if errors is empty, form is fine to submit
    	return errors;

    }
  )
}


// export default validate
