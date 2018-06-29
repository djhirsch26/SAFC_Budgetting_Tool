import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Field, FieldArray, reduxForm, change, initialize} from 'redux-form';
import { Link } from 'react-router-dom'

import Collapsible from 'react-collapsible';

import {
  addDurable
} from '../../actions'

import {durable} from './durableConfig'

import FormGenerator from './formGenerator'

import {validationCreator} from '../validate'


class Durable extends Component {

  onSubmit(values) {
    console.log('DURABLE', values)
    this.props.addDurable(values)
  }

  render() {
      const {handleSubmit} = this.props;
  		return(
      <div>
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
  	   <FormGenerator
       json={durable}
       />
      </form>
      </div>
  		);
  	}
  }

  const validate = validationCreator(durable)

export default connect(
  (state) => ({
  }),
  {addDurable}
)(reduxForm({
	validate,
	form: durable.name,
  destroyOnUnmount: false
})(
Durable
));
