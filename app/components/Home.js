// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import {snakeToTitle} from '../utils'

import {DURABLE} from '../constants'

var fs = require('fs');

var jsPDF = require('jspdf');

import LinkButton from './LinkButton';

class Home extends Component {

  prepareBudget(budget) {
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
            budget[key] = this.prepareBudget(budget[key])
          }
        }
        else if (typeof budget[key]=='array') {
          budget[key].forEach((section, index) => {
            budget[key][index] = this.prepareBudget(section)
          })
        }
      }
    }
    return budget
  }



  makePDF() {
    const budget = this.props.budget
    var doc = new jsPDF('p','pt','a4');
    console.log(budget)
    const TITLE_SIZE = 28
    const WIDTH = 8.27*72
    const HEIGHT = 11.69*72
    // const PTPERIN = 72
    const CENTER = WIDTH/2.0
    var counter = TITLE_SIZE + 5

    for (var category in budget) {
      console.log(category, budget[category])
      doc.setFontSize(TITLE_SIZE)
      var offset = category.length/4.0*TITLE_SIZE
      console.log('offset', category.length, CENTER, offset)
      doc.text(snakeToTitle(category), CENTER-offset, counter)
      counter+=TITLE_SIZE+10
    }
    // var titled = Object.keys(budget).map(title => {
    //   return (snakeToTitle(title))
    // })
    // titled.push('Hello World!')
    // doc.text(titled, 0, counter)
    doc.save('Documentation')
  }

  writeBudget(budget) {
    var preppedBudget = this.prepareBudget(budget)
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

  // <div><LinkButton text='Help' link={`/`}/></div>

  render() {
    return (
      <div className='home'>
        <div className='banner'><span >Welcome to the SAFC Budget Tool</span></div>
        <div className='buttons'>
          <div className='btn-group'>
            <div><LinkButton text='Create a New Budget' link={`/${DURABLE}`}/></div>
            <div><LinkButton text='Edit/View an Existing Budget' link={`/`}/></div>
            <button onClick={()=> {this.writeBudget(this.props.budget)}}>REMOVE ME!</button>
            <button onClick={()=> {this.makePDF()}}>GENERATE PDF!</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    budget: state.budget
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
