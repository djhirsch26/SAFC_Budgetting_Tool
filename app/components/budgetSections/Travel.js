import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Field, FieldArray, reduxForm, change, initialize} from 'redux-form';
import { Link } from 'react-router-dom'

import Collapsible from 'react-collapsible';

import {
  addTravel
} from '../../actions'

import {travel as jsonFile} from './travelConfig'
import FormGenerator from './formGenerator'

import {validationCreator} from '../validate'


class Travel extends Component {

  onSubmit(values) {
    console.log("TRAVEL",values)
    this.props.addTravel(values)
    window.alert('Travel Events Saved To Budget')

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

  function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addTravel
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
	validate,
	form: jsonFile.name,
  destroyOnUnmount: false
})(
Travel
));
