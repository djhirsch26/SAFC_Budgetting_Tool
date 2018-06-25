import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Field, FieldArray, reduxForm, change, initialize} from 'redux-form';
import { Link } from 'react-router-dom'

import Collapsible from 'react-collapsible';

var jsonFile = require('./travel.json');
import FormGenerator from './formGenerator'

import {validationCreator} from '../validate'


class Travel extends Component {

  onSubmit(values) {
    console.log("TRAVEL",values)
  }

  render() {
      const {handleSubmit} = this.props;
  		return(
      <div>
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
  	   <FormGenerator
       json={jsonFile}
       />
      </form>
      </div>
  		);
  	}
  }

  const validate = validationCreator(jsonFile)

export default connect(
  (state) => ({
  }),
  {}
)(reduxForm({
	validate,
	form: jsonFile.name,
  destroyOnUnmount: false
})(
Travel
));
