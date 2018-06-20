import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Field, FieldArray, reduxForm, change} from 'redux-form';
import { Link } from 'react-router-dom'

import Collapsible from 'react-collapsible';

var durableJson = require('./durable.json');
import FormGenerator from './formGenerator'

import validate from '../validate'


class Durable extends Component {

  constructor(props) {
    super(props)
    this.init = false
    this.opened = []
  }

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
       opened={this.props.opened}
       dispatch={this.props.dispatch}/>
      </form>
      </div>
  		);
  	}
  }

export default reduxForm({
	validate,
	form: durableJson.name,
  destroyOnUnmount: false
})(
Durable
);
