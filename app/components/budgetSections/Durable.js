import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Field, FieldArray, reduxForm, change, initialize} from 'redux-form';
import { Link } from 'react-router-dom'

import Collapsible from 'react-collapsible';

var durableJson = require('./durable.json');
import FormGenerator from './formGenerator'

import {validationCreator} from '../validate'


class Durable extends Component {

  onSubmit(values) {
    console.log(values)
  }

  render() {
      const {handleSubmit} = this.props;
  		return(
      <div>
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
  	   <FormGenerator
       json={durableJson}
       />
      </form>
      </div>
  		);
  	}
  }

  const validate = validationCreator(durableJson)

export default connect(
  (state) => ({
  }),
  {}
)(reduxForm({
	validate,
	form: durableJson.name,
  destroyOnUnmount: false
})(
Durable
));
