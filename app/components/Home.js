// @flow
import React, { Component } from 'react';
import { bindActionCreators, dispatch } from 'redux';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import {initialize, reset} from 'redux-form'

import {snakeToTitle} from '../utils'

import {loadFromFile} from '../actions'

import {DURABLE, TRAVEL} from '../constants'
import {durable} from './budgetSections/durableConfig'

import {travel} from './budgetSections/travelConfig'

import PDFGenerator from './pdfGenerator'

var fs = require('fs');

const {dialog, BrowserWindow} = require('electron').remote;

var jsPDF = require('jspdf');

import LinkButton from './LinkButton';

class Home extends Component {

  prepareBudgetToSave(budget) {
    if (typeof budget=='object') {
      for (var key in budget) {
        if (typeof budget[key]=='object') {
          if (budget[key] instanceof File) {
            var fileObject = budget[key]
            var newObject  = {
               'lastModified'     : fileObject.lastModified,
               'lastModifiedDate' : fileObject.lastModifiedDate,
               'name'             : fileObject.name,
               'size'             : fileObject.size,
               'type'             : fileObject.type
            };
            budget[key]=newObject
          }
          else {
            budget[key] = this.prepareBudgetToSave(budget[key])
          }
        }
        else if (typeof budget[key]=='array') {
          budget[key].forEach((section, index) => {
            budget[key][index] = this.prepareBudgetToSave(section)
          })
        }
      }
    }
    return budget
  }

  prepareForRender(config, values) {
    var calculated = {...values}
    var total = 0
    if (config.repeat) {
      for (var key in config.repeat) {
        var repeatable = config.repeat[key]
        repeatable.values.forEach((question, index) => {
          if (question.type == 'calculated') {
            var calculate = question.function
            if (values[repeatable.name]) {
              values[repeatable.name].forEach((response, index2) => {
                var output = calculate(response, values, index2)
                if (!calculated[`${repeatable.name}`]) {
                  calculated[`${repeatable.name}`] = []
                }
                if (!calculated[`${repeatable.name}`][`${parseInt(index2)}`]) {
                  calculated[`${repeatable.name}`][`${parseInt(index2)}`] = {}
                }
                var name = question.name
                calculated[`${repeatable.name}`][`${parseInt(index2)}`][name] = output

              })
            }
          }

          if (question.monetary && values[repeatable.name]) {
            values[repeatable.name].forEach((response) => {
              if (response[question.name]) {
                var price = parseFloat(response[question.name])
                total += price
              }
            })
          }
        })
      }
    }
    if (config.single) {
      for (var key in config.single) {
        var single = config.single[key]
        if (single.monetary) {
          total += parseFloat(temp[single.name])
        }
      }
    }

    calculated.total = total

    return calculated

  }


  prepareBudgetToLoad(budget) {

  }


  makePDF(values) {
    var doc = new jsPDF('p','pt','a4');
    const TITLE_SIZE = 28
    const WIDTH = 8.27*72
    const HEIGHT = 11.69*72
    // const PTPERIN = 72
    const CENTER = WIDTH/2.0
    var counter = TITLE_SIZE + 5

    values = this.prepareBudgetToSave(values)

    var durable_values = this.prepareForRender(durable, values[DURABLE])
    var travel_values = this.prepareForRender(travel, values[TRAVEL])

    console.log(travel_values)

    var generator = new PDFGenerator(doc)
    if (values[DURABLE]!={}) {
      generator.makePDFGenerator(durable, durable_values)
      generator.addPage()
    }
    if (values[TRAVEL]!={}){
      generator.makePDFGenerator(travel, travel_values)
      generator.addPage()
    }

    // if (values[DURABLE]!={}) {
    //   makePDFGenerator(durable, doc, durable_values)
    //   doc.addPage('a4', 1)
    // }
    // if (values[TRAVEL]!={}){
    //   makePDFGenerator(travel, doc, travel_values)
    // }


    return doc
  }

  savePDF(values) {
    var doc = this.makePDF(values)
    doc.save('Documentation')
  }

  writeBudget(budget) {
    var preppedBudget = this.prepareBudgetToSave(budget)
    console.log(preppedBudget)
    var stringedBudget = JSON.stringify(preppedBudget, null, 4)
    console.log(stringedBudget)
    // this.parseBudget(budget)

    fs.writeFile('./temp/tempStore.json', stringedBudget, 'utf8', function(err) {
      if (err) {
          return console.log(err);
      }
      console.log("The file was saved!");
    })
  }

  onLoadFileSelect(filePaths) {
    if (filePaths) {
      if (filePaths.length == 1) {
        fs.readFile(filePaths[0], (err, data) => {
          if (err) {
            dialog.showErrorBox('Error Opening Requested File', err)
            return;
          }
          var budget = JSON.parse(data)
          this.prepareBudgetToLoad(budget)
          this.props.loadFromFile(budget)
          // this.props.reset('budget')
          this.props.initialize(DURABLE, budget[DURABLE], undefined)
          this.props.initialize(TRAVEL, budget[TRAVEL], undefined)

        })
      }
    }
  }

  loadFromFile() {
    console.log('LOAD')
    dialog.showOpenDialog(undefined, {filters: [{"name": "budget", "extensions": ['.json', 'json']}]}, this.onLoadFileSelect.bind(this))
  }

  // <div><LinkButton text='Help' link={`/`}/></div>

  render() {
    return (
      <div className='home'>
        <div className='banner'><span >Welcome to the SAFC Budget Tool</span></div>
        <div className='buttons'>
          <div className='btn-group'>
            <div><LinkButton text='Create a New Budget' link={`/${DURABLE}`}/></div>
            <button onClick={()=> {this.loadFromFile()}}>Edit/View An Existing Budget</button>
            <button onClick={()=> {this.writeBudget(this.props.budget)}}>REMOVE ME!</button>
            <button onClick={()=> {this.makePDF(this.props.budget)}}>GENERATE PDF!</button>
            <button onClick={()=> {this.savePDF(this.props.budget)}}>SAVE PDF!</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    budget: state.budget,
    form: state.form
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadFromFile,
    initialize,
    reset
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
