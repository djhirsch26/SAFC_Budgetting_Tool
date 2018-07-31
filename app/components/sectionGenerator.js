import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector, change, initialize} from 'redux-form';
import { Link } from 'react-router-dom'

import Collapsible from 'react-collapsible';

import {snakeToTitle} from '../utils'

import {
  DURABLE,
  TRAVEL,
  ADMIN,
  LOCAL,
  PUBLICATION,
  LOCAL_CALC_NAME
} from '../constants'

import {
  addDurable,
  addTravel,
  addAdmin,
  addLocal
} from '../actions'

import {durable as durableConfig} from '../budgetSections/durableConfig'
import {travel as travelConfig} from '../budgetSections/travelConfig'
import {admin as adminConfig} from '../budgetSections/adminConfig'
import {local as localConfig} from '../budgetSections/localConfig'

import {speaker_calc as speakerCalc} from '../budgetInfo/speakerFunding'


import FormGenerator from './formGenerator'

import {validationCreator} from './validate'


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
        // writeBudget()
        if(this.onSubmit_) {
          this.onSubmit_(values)
        }
      }

      render() {
          var {handleSubmit, calculated} = this.props;
          console.log(this.props.location)
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
      if (single.type == 'calculated') {
        var calculate = single.function
        var output = calculate(temp)
        values[single.name] = output
        if (single.monetary) {
          total+=output
        }
      }
      else {
        if (single.monetary) {
          total += parseFloat(temp[single.name])
        }
      }
    }
  }

  values.total = total
  values.max_funding = config.max ? Math.min(total, config.max) : total

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
        whole: state.budget
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
    classMaker(name, config, onSubmit)
    ))
  )
}

function onSubmitDurable(values) {
  // console.log('DURABBLE', values)
}
function onSubmitTravel(values) {
  // console.log('TRAVEL', values)
}
function onSubmitAdmin(values) {
  // console.log('TRAVEL', values)
}
function onSubmitLocal(values) {

}

export const durable = generateSection(DURABLE, addDurable, durableConfig, onSubmitDurable)
export const travel = generateSection(TRAVEL, addTravel, travelConfig, onSubmitTravel)
export const admin = generateSection(ADMIN, addAdmin, adminConfig, onSubmitAdmin)
export const local = generateSection(LOCAL, addLocal, localConfig, onSubmitLocal)

export const speaker_calc = generateSection(LOCAL_CALC_NAME, undefined, speakerCalc, ()=>{})
