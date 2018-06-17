import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Field, FieldArray, reduxForm, change} from 'redux-form';
import { Link } from 'react-router-dom'

import Collapsible from 'react-collapsible';

var durableJson = require('./durable.json');

import validate from '../validate'


class Durable extends Component {

  constructor(props) {
    super(props)
    this.init = false
    this.opened = []
  }

  renderField(field) {
    const {meta : {touched, error}} = field;
    var props = field.prop
    const className = `form-group ${touched && error ? "has-danger" : ""} budgetField`;
    var mainClass;
    var labelClass;
    var inputClass;
    var extraStyle = {}
    var onChange = ()=>{}
    var inpLabDivClass = ''
    var other = field.input
    var extraField = <div/>
    switch(field.type) {
      case 'file':
          mainClass = 'form-group row'
          labelClass = 'col-form-label col-sm-6'
          inputClass = 'col-sm-6'
          onChange = (e) => {
            e.preventDefault();
            props.dispatch(change(durableJson.name, field.input.name, [...e.target.files]))
          }
          inpLabDivClass = 'artificialFile'
          other={}
          extraField=<Field name={field.input.name} component='input' type="hidden"/>
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
    onChange={onChange}
    {...other}
    />
    var label = <label className={labelClass} style={{minWidth: '50%'}}>{field.label}</label>

    if (field.type=='file' && props.durable && props.durable.values && props.durable && props.durable.values) {
      function extractValue(values, field_name) {
        if(field_name.includes('[')) {
          var objName = field_name.split('[')[0]
          var index =  field_name.split('[')[1].split(']')[0]
          var fieldName = field_name.split('.')[1]
          return extractValue(values[objName][index], fieldName)
        }
        else {
          return values[field_name]
        }
      }

      var file = extractValue(props.durable.values, field.input.name)
      if (file) {
        inpLabDivClass = 'col-sm-12'
        labelClass=''
        input = <label className='col-sm-6' style={{minWidth: '40%', maxHeight: '30px', marginBottom: '0px'}}><button onClick={(e)=>{e.preventDefault();console.log('CHANGE')}} style={{marginRight: '8px'}}>Change File</button><div className='' style={{display: 'inline', maxHeight:'25px', overflow: 'hidden'}}>{file[0].name}</div></label>
        label = <label className='col-form-label' style={{minWidth: '50%', marginBottom: '10px'}}><div style={{position: 'absolute', top: 2}}>{field.label}</div></label>
      }
    }


    var inpLab = field.type=='checkbox' ? <div className={inpLabDivClass}>{input}{label}</div> : <div className={inpLabDivClass}>{label}{input}</div>
    return(
      <div className={mainClass} style={{paddingTop: '10px', ...extraStyle}}>
        {inpLab}
        {extraField}
        <div className="text-help">
        {touched ? error : ""}
        </div>
      </div>
      );
  }

  renderGoods({fields, prop, init, opened, renderField, questions, remove, meta: {error, submitFailed}}) {
    if(!init && fields.length==0) {
      fields.push({})
      opened.push(true)
    }

    var onAdd = function()  {
      fields.push({})
      opened.push(false)
    }

    var onRemove = function(index) {
      return (function() {
        opened.splice(index, 1)
        fields.remove(index)
      })
    }

    var onOpen = function(index) {
      return (function() {
        opened[index]=true
        // console.log('Op', opened)

      })
    }

    var onClose = function(index) {
      return (function() {
        opened[index]=false
        // console.log('Op', opened)
      })
    }

    // console.log('Opened', opened)

    return(
      <div>
      <button className='btn btn-secondary'type="button" onClick={onAdd}>{questions.addButton}</button>
      <div style={{paddingTop: '3%'}}>
        {
        fields.map((good,index) => {
          var triggerText = prop.durable.values && prop.durable.values.goods && prop.durable.values.goods[index] && prop.durable.values.goods[index].name!=undefined ? prop.durable.values.goods[index].name : `Durable Good ${index}`
        return(
          <div key={index} className='collapser' style={{paddingBottom: '15px', position: 'relative'}}>
          <Collapsible trigger={triggerText} open={opened[index]} onOpen={onOpen(index)} onClose={onClose(index)}>
          <button className='btn btn-danger' onClick={onRemove(index)} style={{position: 'block', float: 'right', margin: '5px', marginTop: '5px'}}>{questions.removeButton}</button>
          {questions.values.map(({label, name, type='text', defaultValue}, index2) => {
        return(
          <Field
            key={`${good}.${name}_${index2}`}
            label={label}
            name={`${good}.${name}`}
            type={type}
            initialValues={defaultValue}
            prop={prop}
            index={index}
            component={renderField}
          />
        )})}
        </Collapsible>
        </div>
      )})
      }
          </div>
      </div>
    )
  }

  onSubmit(values) {
  	console.log('WHOM')
    console.log(values)
  }

  render() {

  		const {handleSubmit} = this.props;


      const repeated = durableJson.repeat ?
      durableJson.repeat.map((questions, index) => {
         return (
          <FieldArray name={questions.name} key={index} prop={this.props} opened={this.opened} init={this.init} renderField={this.renderField} questions={questions} component={this.renderGoods}/>
        )
        })
      : <div/>

      this.init=true

      const fields = durableJson.single ?
      <div className='singleFields'>
      {durableJson.single.map(({label, name, type='text'}, index2) => {
        return(
          <Field
            key={name}
      			label={label}
      			name={name}
            type={type}
            prop={this.props}
      			component={this.renderField}
      		/>
        )})} </div> : <div/>

  		return(
      <div>

  		<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div style={{width: '98%', paddingLeft: '3%', paddingTop: '3%'}}>
          {repeated}
          {fields}
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
    durable: state.form.durable
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({

})
}

export default reduxForm({
	validate,
	form: durableJson.name,
  destroyOnUnmount: false
})(
connect(mapStateToProps, mapDispatchToProps)(Durable)
);
