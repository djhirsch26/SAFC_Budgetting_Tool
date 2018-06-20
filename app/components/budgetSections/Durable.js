import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Field, FieldArray, reduxForm, change} from 'redux-form';
import { Link } from 'react-router-dom'

import Collapsible from 'react-collapsible';

import {openCollapse, closeCollapse, addCollapse, removeCollapse} from '../../actions'

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
       values={this.props.durable}
       onOpen={this.props.openCollapse.bind(this)}
       onClose={this.props.closeCollapse.bind(this)}
       onAdd={this.props.addCollapse.bind(this)}
       onRemove={this.props.removeCollapse.bind(this)}
       opened={this.props.opened}
       dispatch={this.props.dispatch}/>
      </form>
      </div>
  		);
  	}
  }

function mapStateToProps(state) {
  return {
    durable: state.form.durable,
    opened: state.opener
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({
    openCollapse,
    closeCollapse,
    addCollapse,
    removeCollapse
}, dispatch)
}

export default reduxForm({
	validate,
	form: durableJson.name,
  destroyOnUnmount: false
})(
connect(mapStateToProps, mapDispatchToProps)(Durable)
);
