var durableJson = require('./budgetSections/durable.json');

function validate(values) {
	const errors = {};

	//Validate Input

  // durableJson.forEach(({name, label, errorMessage}) => {
  //   if(!values[name]) {
  //     errors[name] = errorMessage
  //   }
  // })
	// if(!values.name) {
	// 	errors.title = "Enter a Title";
	// }
	// if(!values.categories) {
	// 	errors.categories = "Enter a Category";
	// }
	// if(!values.content) {
	// 	errors.content = "Enter some Content Please";
	// }

	//if errors is empty, form is fine to submit
	return errors;

}

export default validate
