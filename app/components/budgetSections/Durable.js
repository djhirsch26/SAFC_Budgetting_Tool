import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom'

import Collapsible from 'react-collapsible';

var durableJson = require('./durable.json');

import validate from '../validate'


class Durable extends Component {

  constructor(props) {
    super(props)
  }

  renderField(field) {
  	const {meta : {touched, error}} = field;
  	const className = `form-group ${touched && error ? "has-danger" : ""} budgetField`;

    var mainClass;
    var labelClass;
    var inputClass;
    var extraStyle = {}
    var inpLabDivClass = ''
    switch(field.type) {
      case 'file':
          mainClass = 'form-group row'
          labelClass = 'col-form-label col-sm-6'
          inputClass = 'col-sm-6'
          inpLabDivClass = ''
          break;
      case 'checkbox':
          mainClass = 'form-check'
          labelClass = 'form-check-label'
          inputClass = 'form-check-input'
          break;
      case 'text':
          mainClass = 'form-group'
          labelClass = ''
          inputClass = 'form-control'
          break;
      default:
          mainClass = 'form-group'
          labelClass = ''
          inputClass = 'form-control'
          break;
    }

    var input = <input
    id = 'input'
    className= {inputClass}
    type={field.type}
    {...field.input}
    />

    var label = <label className={labelClass} for='input'>{field.label}</label>

    var inpLab = field.type=='checkbox' ? <div className={inpLabDivClass}>{input}{label}</div> : <div className={inpLabDivClass}>{label}{input}</div>

  	return(
  		<div className={mainClass} style={{paddingTop: '10px', ...extraStyle}}>
        {inpLab}
  			<div className="text-help">
  			{touched ? error : ""}
  			</div>
  		</div>
  		);
  }

  onSubmit(values) {
  	console.log('WHOM')
  }

  render() {

  		const {handleSubmit} =this.props;

      var fields = durableJson.map(({label, name, type='text'}) => {
        return(
          <Field
            key={name}
      			label={label}
      			name={name}
            type={type}
      			component={this.renderField}
      		/>
      )
      })

      var collabsableFields =
      <div className='collapser'>
      <Collapsible trigger="Start here">
       {fields}
      </Collapsible>
      </div>


      console.log(fields)
  		return(
      <div>

  		<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div style={{width: '98%', paddingLeft: '3%'}}>
          <div style={{paddingBottom: '30px'}}>
  			     {collabsableFields}
          </div>
  			  <button type="submit" className="btn btn-primary">Add to Budget</button>
  			  <Link to="/" className="btn btn-danger">Cancel</Link>
        </div>
  		</form>
      </div>
  		);
  	}
  }

function mapStateToProps(state) {
  return {
    budget: state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default reduxForm({
	validate,
	form: 'Budget',
  destroyOnUnmount: false
})(
connect(mapStateToProps, mapDispatchToProps)(Durable)
);
