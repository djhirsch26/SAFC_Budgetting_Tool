import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Field, FieldArray, reduxForm, change, initialize} from 'redux-form';
import { Link } from 'react-router-dom'

import Collapsible from 'react-collapsible';

import {DURABLE} from '../../constants'

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
    window.alert('Durable Goods Saved To Budget')
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

function mapStateToProps(state) {
  console.log(state)
  return ({
    initialValues: state.budget[DURABLE],
  })
}


export default connect(
  mapStateToProps,
  {addDurable}
)(reduxForm({
	validate,
  enableReinitialize: true,
  // initialValues: {"durable_goods": [{"name": 'HENRY'}]},
	form: durable.name,
  destroyOnUnmount: false
})(
Durable
));
