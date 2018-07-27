import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector, change, initialize} from 'redux-form';
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
          var {handleSubmit, calculated} = this.props;
      		return(
          <div>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      	   <FormGenerator
           calculated={calculated}
           json={this.config}
           />
          </form>
          </div>
      		);
      	}
      }
  )


}

function getTotalSpent(state, selector, config, section) {
  var temp = {}
  var values = {}
  var total = 0
  if (config.repeat) {
    for (var key in config.repeat) {
      var repeatable = config.repeat[key]
      temp[repeatable.name] = selector(state, 'form', section, 'values', repeatable.name)[repeatable.name]
      repeatable.values.forEach((question, index) => {

        if (question.type == 'calculated') {
          var calculate = question.function
          if (temp[repeatable.name]) {
            temp[repeatable.name].forEach((response, index2) => {
              var output = calculate(response, temp, index2)
              if (!values[`${repeatable.name}`]) {
                values[`${repeatable.name}`] = []
              }
              values[`${repeatable.name}`][`${parseInt(index2)}`] = {}
              var name = question.name
              values[`${repeatable.name}`][`${parseInt(index2)}`][name] = output

              if (question.monetary) {
                total+=output
              }
            })
          }
        }
        else {
          if (question.monetary && temp[repeatable.name]) {
            if (temp[repeatable.name]) {
              temp[repeatable.name].forEach((response) => {
                if (response[question.name]) {
                  var price = parseFloat(response[question.name])
                  total += price
                }
              })
            }
          }
        }
      })
    }
  }
  if (config.single) {
    for (var key in config.single) {
      var single = config.single[key]
      temp[single.name] = selector(state, 'form', section, 'values', single.name)[single.name]

      if (single.monetary) {
        total += parseFloat(temp[single.name])
      }
    }
  }

  values.total = total

  // console.log(total)
  return values
  // console.log(state.form[section].values)
  // console.log(temp)
}


function generateSTP(section, config) {

  const selector = formValueSelector(section);


  return (
    function mapStateToProps(state) {
      var calculated = getTotalSpent(state, selector, config, section)

      return ({
        initialValues: state.budget[section],
        calculated: calculated,
      })
    }
  )
}

function generateSection(name, adderFunction, config, onSubmit) {
  return (
    connect(
      generateSTP(name, config),
      {adderFunction}
    )(reduxForm({
    	validate: validationCreator(config),
    	form: name,
      // enableReinitialize: true,
      destroyOnUnmount: false
    })(
    classMaker(name, config, onSubmitDurable)
    ))
  )
}

function onSubmitDurable(values) {console.log('DURABBLE', values)}
function onSubmitTravel(values) {console.log('TRAVEL', values)}

export const durable = generateSection(DURABLE, addDurable, durableConfig, onSubmitDurable)
export const travel = generateSection(TRAVEL, addTravel, travelConfig, onSubmitTravel)
