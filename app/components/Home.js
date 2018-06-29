// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

var fs = require('fs');

import LinkButton from './LinkButton';

class Home extends Component {

  writeBudget(budget) {
    var stringedBudget = JSON.stringify(budget, null, 4)
    console.log(stringedBudget)
    fs.writeFile('./store/tempStore.json', stringedBudget, 'utf8', function(err) {
      if (err) {
          return console.log(err);
      }
      console.log("The file was saved!");
    })
  }

  render() {
    return (
      <div className='home'>
        <div className='banner'><span>Welcome to the SAFC Budget Tool</span></div>
        <div className='buttons'>
        <div className='btn-group'>
          <div><LinkButton text='Create a New Budget' link={`/durable`}/></div>
          <div><LinkButton text='Edit/View an Existing Budget' link={`/`}/></div>
          <div><LinkButton text='Help' link={`/`}/></div>
          <button onClick={()=> {this.writeBudget(this.props.budget)}}>REMOVE ME!</button>
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
