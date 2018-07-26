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
