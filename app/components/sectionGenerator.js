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
  GENERAL,
  LOCAL_CALC_NAME,
  SECTIONS
} from '../constants'

import {
  addDurable,
  addTravel,
  addAdmin,
  addLocal,
  addPublication,
  addGeneral
} from '../actions'

import {durable as durableConfig} from '../budgetSections/durableConfig'
import {travel as travelConfig} from '../budgetSections/travelConfig'
import {admin as adminConfig} from '../budgetSections/adminConfig'
import {local as localConfig} from '../budgetSections/localConfig'
import {publication as publicationConfig} from '../budgetSections/publicationConfig'

import {general as generalConfig} from '../budgetInfo/generalInfo'
import {speaker_calc as speakerCalc} from '../budgetInfo/speakerFunding'

var configs = {}
configs[DURABLE]=durableConfig
configs[TRAVEL]=travelConfig
configs[LOCAL]=localConfig
configs[ADMIN]=adminConfig
configs[PUBLICATION]=publicationConfig

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
          var {handleSubmit, calculated, configs} = this.props;
      		return(
          <div>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      	   <FormGenerator
           calculated={calculated}
           configs={configs}
           json={this.config}
           />
          </form>
          </div>
      		);
      	}
      }
  )


}


/* ------------------------- SECTION/CALCULATOR STP ------------------------- */
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


/* ------------------------- GENERAL STP ----------------------------- */
function getTotals(state, selectors, config, section) {
  var totals = {}
  console.log(state)
  SECTIONS.forEach(section => {
    var calced = getTotalSpent(state, selectors[section], configs[section], section)
    totals[section] = calced.total
  })
  var calculated = getTotalSpent(state, selectors[GENERAL], generalConfig, GENERAL)
  // totals[ADMIN] = getTotalSpent(state, selectors, adminConfig, ADMIN)
  // totals[DURABLE] = getTotalSpent(state, selector, durableConfig, DURABLE)
  // totals[LOCAL] = getTotalSpent(state, selector, localConfig, LOCAL)
  // totals[TRAVEL] = getTotalSpent(state, selector, travelConfig, TRAVEL)
  // totals[PUBLICATION] = getTotalSpent(state, selector, publicationConfig, PUBLICATION)

  // console.log(totals[ADMIN])
  // totals[GENERAL]= totals[ADMIN] + totals[DURABLE] + totals[LOCAL] + totals[TRAVEL] + totals[PUBLICATION]
  return {...calculated, totals: totals}
}

function generateGeneralSTP(section, config) {

  var selectors = {}
  SECTIONS.forEach(section => {
    selectors[section] = formValueSelector(section)
  })
  selectors[GENERAL] = formValueSelector(GENERAL)
 return (
    function mapStateToProps(state) {
      var calculated = getTotals(state, selectors, config, section)
      return ({
        initialValues: state.budget[section],
        calculated: calculated,
        whole: state.budget,
        configs: configs
      })
    }
  )
}

function generateGeneral(name, adderFunction, config, onSubmit) {
  return (
    connect(
      generateGeneralSTP(name, config),
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
function onSubmitPublication(values) {

}
function onSubmitGeneral(values) {

}

export const durable = generateSection(DURABLE, addDurable, durableConfig, onSubmitDurable)
export const travel = generateSection(TRAVEL, addTravel, travelConfig, onSubmitTravel)
export const admin = generateSection(ADMIN, addAdmin, adminConfig, onSubmitAdmin)
export const local = generateSection(LOCAL, addLocal, localConfig, onSubmitLocal)
export const publication = generateSection(PUBLICATION, addPublication, publicationConfig, onSubmitPublication)

export const general = generateGeneral(GENERAL, addGeneral, generalConfig, onSubmitGeneral)

export const speaker_calc = generateSection(LOCAL_CALC_NAME, undefined, speakerCalc, ()=>{})
