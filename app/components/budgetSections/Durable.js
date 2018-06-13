import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Field, FieldArray, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom'

import Collapsible from 'react-collapsible';

var durableJson = require('./durable.json');

import validate from '../validate'


class Durable extends Component {

  constructor(props) {
    super(props)
    this.opened = {}
  }




  renderGoods({fields, opened, meta: {error, submitFailed}}) {
    // const renderSimple = this.renderSimple.bind(this)

    function renderField(field) {
    	// const {meta : {touched, error}} = field;
    	// const className = `form-group ${touched && error ? "has-danger" : ""} budgetField`;

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
    			</div>
    		</div>
    		);
    }
    // {touched ? error : ""}


    function renderCollapsable(field) {
      var {index, good} = field
      const goods = durableJson.map(({label, name, type='text'}, index2) => {
        return(
          <Field
            key={`${good}.name_${index}_${index2}`}
      			label={label}
      			name={`${good}.name_${index}_${index2}`}
            type={type}
      			component={renderField}
      		/>
      )
      })

      // if(!opened[index]) {
      //   opened[index]=false
      // }
      //
      // function onOpen() {
      //   console.log('opening')
      //   opened[index]=true
      // }
      //
      // function onClose() {
      //   console.log('closing')
      //   opened[index]=false
      // }

      // var collabsableFields =
      // <div className='collapser'>
      // <Collapsible trigger="Start here" open={opened[index]} onOpen={onOpen} onClose={onClose}>
      //  {goods}
      // </Collapsible>
      // </div>


      return(<div>{goods}</div>)
    }





    // console.log(props)

    const fieldList = fields.map((good, index) => {
      return (
      <div key={`HOW${index}`}>
      <Field
        name={`HOW${index}`}
        index={index}
        good={good}
        component={renderCollapsable}
      />
      </div>
    )

    })

    return(
      <div>
      Hi
      <button type="button" onClick={() => fields.push({})}>Add Member</button>
      <div>{fieldList}</div>
      </div>
    )
  }

  onSubmit(values) {
  	console.log('WHOM')
    console.log(values)
  }

  render() {

  		const {handleSubmit} =this.props;

      const renderGoods = this.renderGoods
  		return(
      <div>

  		<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div style={{width: '98%', paddingLeft: '3%'}}>
          <div style={{paddingBottom: '30px'}}>
             <FieldArray name='goods' opened={this.opened} component={renderGoods}/>
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
