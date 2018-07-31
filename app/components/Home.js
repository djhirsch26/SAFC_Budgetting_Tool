// @flow
import React, { Component } from 'react';
import { bindActionCreators, dispatch } from 'redux';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import {initialize, reset} from 'redux-form'

import {snakeToTitle} from '../utils'

import {loadFromFile} from '../actions'

import {DURABLE, TRAVEL} from '../constants'

import {durable} from '../budgetSections/durableConfig'
import {travel} from '../budgetSections/travelConfig'

import {writeBudget, makePDF, savePDF} from '../utils/fs_helpers'

const {dialog, BrowserWindow} = require('electron').remote;
var fs = require('fs');


import LinkButton from './LinkButton';

class Home extends Component {

  // <div><LinkButton text='Help' link={`/`}/></div>
  onLoadFileSelect(filePaths) {
    if (filePaths) {
      if (filePaths.length == 1) {
        fs.readFile(filePaths[0], (err, data) => {
          if (err) {
            dialog.showErrorBox('Error Opening Requested File', err)
            return;
          }
          var budget = JSON.parse(data)
          this.props.loadFromFile(budget)
          // this.props.reset('budget')
          this.props.initialize(DURABLE, budget[DURABLE], undefined)
          this.props.initialize(TRAVEL, budget[TRAVEL], undefined)

        })
      }
    }
  }

  make_pdf(budget) {
    makePDF(budget)
  }

  save_pdf(budget) {
    savePDF(budget)
  }


  loadFromFile() {
    console.log('LOAD')
    dialog.showOpenDialog(undefined, {filters: [{"name": "budget", "extensions": ['.json', 'json']}]}, this.onLoadFileSelect.bind(this))
  }

  render() {
    return (
      <div className='home'>
        <div className='banner'><span >Welcome to the SAFC Budget Tool</span></div>
        <div className='buttons'>
          <div className='btn-group'>
            <div><LinkButton text='Create a New Budget' link={`/${DURABLE}`}/></div>
            <button onClick={()=> {this.loadFromFile()}}>Edit/View An Existing Budget</button>
            <button onClick={()=> {this.make_pdf(this.props.budget)}}>GENERATE PDF!</button>
            <button onClick={()=> {this.save_pdf(this.props.budget)}}>SAVE PDF!</button>
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
