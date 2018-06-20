import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Field, FieldArray, reduxForm, change} from 'redux-form';
import { Link } from 'react-router-dom'

import Collapsible from 'react-collapsible';
import validate from '../validate'

import {openCollapse, closeCollapse, addCollapse, removeCollapse, init} from '../../actions'


const isEmpty = function(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const extractValue = function(values, field_name) {
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

class FormGenerator extends Component {

  constructor(props) {
    super(props)
  }

  renderField(field) {
    const {meta : {touched, error, dispatch}, values, jsonFile, thisVar} = field;
    const className = `form-group ${touched && error ? "has-danger" : ""} budgetField`;
    var mainClass;
    var labelClass;
    var inputClass;
    var extraRef = {};
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
            dispatch(change(jsonFile.name, field.input.name, [...e.target.files]))
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
    id = {`input_${jsonFile.name}_${field.input.name}`}
    className= {inputClass}
    type={field.type}
    onChange={onChange}
    hidden={field.type=='file' && values && values.values && extractValue(values.values, field.input.name)}
    ref={(e) =>{thisVar[`${jsonFile.name}_${field.input.name}_ref`] = e}}
    {...other}
    />
    var label = <label className={labelClass} style={{minWidth: '50%'}}>{field.label}</label>

    var inpLab = field.type=='checkbox' ? <div className={inpLabDivClass}>{input}{label}</div> : <div className={inpLabDivClass}>{label}{input}</div>


    if (field.type=='file' && values && values.values) {
      var file = extractValue(values.values, field.input.name)
      if (file) {
        inpLabDivClass = 'col-sm-12'
        labelClass=''
        var changeFile = () => {console.log(thisVar[`${jsonFile.name}_${field.input.name}_ref`]); thisVar[`${jsonFile.name}_${field.input.name}_ref`].click()}
        changeFile=changeFile.bind(thisVar)
        console.log(thisVar[`${jsonFile.name}_${field.input.name}_ref`], changeFile)
        var input2 = <label className='col-sm-6' style={{minWidth: '40%', maxHeight: '30px', marginBottom: '0px'}}><button onClick={(e)=>{console.log('CHANGE'); changeFile()}} style={{marginRight: '8px'}}>Change File</button><div className='' style={{display: 'inline', maxHeight:'25px', overflow: 'hidden'}}>{file[0].name}</div></label>
        label = <label className='col-form-label' style={{minWidth: '50%', marginBottom: '10px'}}><div style={{position: 'absolute', top: 2}}>{field.label}</div></label>
        inpLab = <div className={inpLabDivClass}>{label}{input}{input2}</div>
      }
    }


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

  renderGoods(goods) {
    var {fields, jsonFile, thisVar, add, remove, values, open, close, dispatch, init, opened, renderField, questions, meta: {error, submitFailed}} = goods
    if(!init && fields.length==0 && opened!=undefined) {
      fields.push({})
      add(jsonFile.name, goods.fields.name, fields.length, init)
    }


    var onOpen = function(index) {
      return (function() {
        open(jsonFile.name, goods.fields.name, index)
      })
    }

    var onClose = function(index) {
      return (function() {
        close(jsonFile.name, goods.fields.name, index)
      })
    }

    var onAdd = function(e) {
        e.preventDefault()
        fields.push({})
        add(jsonFile.name, goods.fields.name)
    }

    var onRemove = function(index) {
      return (function(e) {
        e.preventDefault()
        fields.remove(index)
        remove(jsonFile.name, goods.fields.name, index)
      })
    }

    console.log('HERE0', values)
    return(
      <div>
      <button className='btn btn-secondary'type="button" onClick={onAdd}>{questions.addButton}</button>
      <div style={{paddingTop: '3%'}}>
        {
        fields.map((good,index) => {
          var triggerText = values && values.values && values.values.goods && values.values.goods[index] && values.values.goods[index].name!=undefined ? values.values.goods[index].name : `Durable Good ${index}`
        return(
          <div key={index} className='collapser' style={{paddingBottom: '15px', position: 'relative'}}>
          <Collapsible trigger={triggerText} accordionPosition={index} handleTriggerClick={((index) => {opened[`${jsonFile.name}_${goods.fields.name}`][index] ? onClose(index)() : onOpen(index)()})}  open={opened[`${jsonFile.name}_${goods.fields.name}`][index]} >
          <button className='btn btn-danger' onClick={onRemove(index)} style={{position: 'block', float: 'right', margin: '5px', marginTop: '5px'}}>{questions.removeButton}</button>
          {questions.values.map(({label, name, type='text', defaultValue}, index2) => {
        return(
          <Field
            key={`${good}.${name}_${index2}`}
            label={label}
            name={`${good}.${name}`}
            type={type}
            thisVar={thisVar}
            jsonFile={jsonFile}
            dispatch={dispatch}
            values={values}
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

  componentDidMount() {
    this.props.init()
  }

  render() {
      const jsonFile = this.props.json
      const repeated = jsonFile.repeat ?
      jsonFile.repeat.map((questions, index) => {
         return (
          <FieldArray
          name={questions.name}
          jsonFile={jsonFile}
          dispatch={this.props.dispatch}
          key={index}
          values={this.props.durable}
          opened={this.props.opened}
          init={this.props.opened.init}
          renderField={this.renderField}
          questions={questions}
          open={this.props.openCollapse}
          close={this.props.closeCollapse}
          add={this.props.addCollapse}
          remove={this.props.removeCollapse}
          thisVar={this}
          component={this.renderGoods}/>
        )
        })
      : <div/>

      const fields = jsonFile.single ?
      <div className='singleFields'>
      {jsonFile.single.map(({label, name, type='text'}, index2) => {
        return(
          <Field
            key={name}
      			label={label}
      			name={name}
            type={type}
            jsonFile={jsonFile}
            dispatch={this.props.dispatch}
            values={this.props.durable}
            thisVar={this}
      			component={this.renderField}
      		/>
        )})} </div> : <div/>

  		return(
      <div>
        <div style={{width: '98%', paddingLeft: '3%', paddingTop: '3%'}}>
          {repeated}
          {fields}
  			  <button type="submit" className="btn btn-primary">Add to Budget</button>
  			  <Link to="/" className="btn btn-danger">Cancel</Link>
        </div>
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
    removeCollapse,
    init
}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FormGenerator)
