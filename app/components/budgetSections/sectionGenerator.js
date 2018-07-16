import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Field, FieldArray, reduxForm, change, initialize} from 'redux-form';
import { Link } from 'react-router-dom'

import Collapsible from 'react-collapsible';

import {DURABLE, TRAVEL} from '../../constants'

import {snakeToTitle} from '../../utils'


import {
  addDurable,
  addTravel
} from '../../actions'

import {durable as durableConfig} from './durableConfig'
import {travel as travelConfig} from './travelConfig'

import FormGenerator from './formGenerator'

import {validationCreator} from '../validate'


function classMaker(name, config, onSubmit_) {
  return (
    class Section extends Component {

      constructor(props) {
        super(props)
        this.onSubmit_ = onSubmit_
        this.config = config
      }

      onSubmit(values) {
        this.props.adderFunction(values)
        window.alert(snakeToTitle(name) + ' Saved To Budget')
        this.onSubmit_(values)
      }

      render() {
          const {handleSubmit} = this.props;
      		return(
          <div>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      	   <FormGenerator
           json={this.config}
           />
          </form>
          </div>
      		);
      	}
      }
  )


}

function generateSTP(section) {
  return (
    function mapStateToProps(state) {
      return ({
        initialValues: state.budget[section],
      })
    }
  )
}

function generateSection(name, adderFunction, onSubmit, config) {
  return (
    connect(
      generateSTP(name),
      {adderFunction}
    )(reduxForm({
    	validate: validationCreator(config),
      enableReinitialize: true,
    	form: name,
      destroyOnUnmount: false
    })(
    classMaker(name, config, onSubmitDurable)
    ))
  )
}

// export const durable = connect(
//   generateSTP(DURABLE),
//   {addDurable}
// )(reduxForm({
// 	validate: validationCreator(durableConfig),
//   enableReinitialize: true,
// 	form: DURABLE,
//   destroyOnUnmount: false
// })(
// classMaker(onSubmitDurable, durableConfig)
// ));

function onSubmitDurable(values) {console.log('DURABBLE', values)}
function onSubmitTravel(values) {console.log('TRAVEL', values)}

export const durable = generateSection(DURABLE, addDurable, onSubmitDurable, durableConfig)
export const travel = generateSection(TRAVEL, addTravel, onSubmitTravel, travelConfig)
