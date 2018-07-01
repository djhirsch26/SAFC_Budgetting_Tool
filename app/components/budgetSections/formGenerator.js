import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Field, FieldArray, reduxForm, change} from 'redux-form';
import { Link } from 'react-router-dom'

import Collapsible from 'react-collapsible';
import validate from '../validate';
import ListGenerator from '../ListGenerator.js'

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

//goods[0].hobbies[2].max_funding
const constructName = function(inputField, givenName) {
  if(inputField.includes('[')) {
    var inputLevels = inputField.split('.')
    var name = ''
    inputLevels.forEach((level, index) => {
      if (index<inputLevels.length-1) {
        name+=level + '.'
      }
    })
    return name+givenName
  }
  return givenName
}

class FormGenerator extends Component {

  constructor(props) {
    super(props)
  }

  renderField(field) {
    const {meta : {touched, error, dispatch}, values, index, jsonFile, onError, thisVar} = field;
    const classNhame = `form-group budgetField ${touched && error ? "has-danger" : ""}`;
    var mainClass;
    var labelClass;
    var inputClass;
    var extraRef = {};
    var extraStyle = {}
    var onChange = field.input.onChange
    var inpLabDivClass = ''
    var other = field.input
    var extraField = <div/>
    var message = <div/>
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
          other={checked: field.input.value}
          extraField=<Field name={field.input.name} component='input' type="hidden"/>
          break;
      case 'checkbox':
          mainClass = 'form-check'
          labelClass = 'form-check-label'
          inputClass = 'form-check-input'
          break;
      case 'calculated':
          mainClass = 'form-group'
          labelClass = ''
          inputClass = 'form-control'
          var value = values && values.values && extractValue(values.values, field.input.name) ? extractValue(values.values, field.input.name) : 0
          value = field.display(value)
          other = {...other, disabled: true, value: value }
          break;
      case 'text':
          mainClass = 'form-group'
          labelClass = ''
          inputClass = 'form-control'
          other = {...other}
          break;
      default:
          mainClass = 'form-group'
          labelClass = ''
          inputClass = 'form-control'
          break;
    }

    if (field.message) {
      switch(typeof field.message) {
        case 'object':
          message = <ListGenerator list={field.message} depth={2}/>
          break;
        case 'string':
          console.log('string', field.message)
          break;
        default:
          console.log(typeof field.message, field.message)
      }
    }

    //TODO: GET TO USE MOST RECENT VALUE

    if (field.calculate) {
      var calculate = field.calculate
      onChange = (e) => {
        field.input.onChange(e)
        var name = constructName(field.input.name, calculate.name)
        dispatch(change(jsonFile.name, name, calculate.function(e.target.value, values.values ? values.values : {}, index)))
      }
    }


    var input = <input
    id = {`input_${jsonFile.name}_${field.input.name}`}
    className= {inputClass}
    type={field.type}
    hidden={field.type=='file' && values && values.values && extractValue(values.values, field.input.name)}
    ref={(e) =>{thisVar[`${jsonFile.name}_${field.input.name}_ref`] = e}}
    {...other}
    onChange={onChange}

    />
    var label = <label className={labelClass} style={{minWidth: '50%', padding: 0}}>{field.label}</label>

    var inpLab = field.type=='checkbox' ? <div className={inpLabDivClass}>{input}{label}</div> : <div className={inpLabDivClass}>{label}{input}</div>


    if (field.type=='file' && values && values.values) {
      var file = extractValue(values.values, field.input.name)
      if (file) {
        inpLabDivClass = 'col-sm-12'
        labelClass=''
        var changeFile = () => {thisVar[`${jsonFile.name}_${field.input.name}_ref`].click()}
        changeFile=changeFile.bind(thisVar)
        var input2 = <label className='col-sm-6' style={{minWidth: '40%', maxHeight: '30px', marginBottom: '0px'}}><button onClick={(e)=>{e.preventDefault(); changeFile()}} style={{marginRight: '8px'}}>Change File</button><div className='' style={{display: 'inline', maxHeight:'25px', overflow: 'hidden'}}>{file[0].name}</div></label>
        label = <label className='col-form-label' style={{minWidth: '50%', marginBottom: '10px'}}><div style={{position: 'absolute', top: 2}}>{field.label}</div></label>
        inpLab = <div className={inpLabDivClass} style={{padding: 0}}>{label}{input}{input2}</div>
      }
    }

    if(onError && touched) {
      onError(error)
    }

    return(
      <div style={{paddingTop: '10px', marginBottom: '15px'}}>
        <div className={mainClass} style={{margin: 0, ...extraStyle}}>
          {inpLab}
          {extraField}
        </div>
        <div style={{paddingLeft: '20px'}}>{message}</div>
        <div style={{color: 'red'}}>
        {touched ? error : ""}
        </div>
      </div>
      );
  }

  renderGoods(goods) {
    var {fields, jsonFile, thisVar, add, remove, values, open, close, dispatch, init, opened, renderField, questions, meta: {error, submitFailed}} = goods

    if(!init[jsonFile.name] && fields.length==0 && opened!=undefined) {
      fields.push({})
      if(!thisVar.repeatError) {
        thisVar.repeatError = {}
      }
      thisVar.repeatError[questions.name]=[]
      thisVar.repeatError[questions.name].push([])
      add(jsonFile.name, goods.fields.name, fields.length, init)
    }
    else if(!init) {
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
        thisVar.repeatError[questions.name].push([])
        add(jsonFile.name, goods.fields.name)
    }

    var onRemove = function(index) {
      return (function(e) {
        e.preventDefault()
        fields.remove(index)
        thisVar.repeatError[questions.name].splice(index,1)
        remove(jsonFile.name, goods.fields.name, index)
      })
    }

    var onTriggerClick = function(index) {
      if(opened[`${jsonFile.name}_${goods.fields.name}`]) {
        if(opened[`${jsonFile.name}_${goods.fields.name}`][index]) {
          onClose(index)()
        }
        else {
          onOpen(index)()
        }
      }
    }

    var onError = function(index, index2) {
      return (
        function(e) {
          if(thisVar.repeatError) {
            if(e) {
              thisVar.repeatError[questions.name][index][index2] = true
            }
            else {
              thisVar.repeatError[questions.name][index][index2] = false
            }
          }
        }
      )
    }

    return(
      <div>
      <div style={{paddingBottom: '3%'}}>
        {
        fields.map((good,index) => {
          var triggerText = values && values.values && values.values[fields.name] && values.values[fields.name][index] && values.values[fields.name][index].name!=undefined ? values.values[fields.name][index].name : `${questions.defaultTriggerText} ${index}`
          var triggerStyle = {}
        return(
          <div key={index} className='collapser' style={{paddingBottom: '15px', position: 'relative'}}>
          <Collapsible trigger={triggerText} accordionPosition={index} handleTriggerClick={onTriggerClick}  open={opened[`${jsonFile.name}_${goods.fields.name}`] ? opened[`${jsonFile.name}_${goods.fields.name}`][index] : true} >
          <button className='btn btn-danger' onClick={onRemove(index)} style={{position: 'block', float: 'right', margin: '5px', marginTop: '5px'}}>{questions.removeButton}</button>
          {questions.values.map((
            {label,
            name,
            normalize,
            type='text',
            defaultValue='',
            calculate,
            display,
            message,
          }, index2) => {
        return(
          <Field
            key={`${good}.${name}_${index2}`}
            label={label}
            name={`${good}.${name}`}
            type={type}
            thisVar={thisVar}
            jsonFile={jsonFile}
            dispatch={dispatch}
            display={display}
            calculate={calculate}
            normalize={normalize}
            onError={onError(index, index2)}
            message={message}
            values={values}
            index={index}
            component={renderField}
          />
        )})}
        </Collapsible>
        </div>
      )})
      }
      <div style={{overflow: 'hidden'}}><button className='btn btn-secondary' type="button" style={{float: 'right'}} onClick={onAdd}>{questions.addButton}</button></div>
          </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.init(this.props.json.name)
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
          values={this.props.budget[jsonFile.name]}
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

      const fields = jsonFile.single && jsonFile.single.length!=0 ?
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
            values={this.props.section}
            thisVar={this}
      			component={this.renderField}
      		/>
        )})} </div> : <div/>

        var links = <div/>
        if(jsonFile.links) {
          links =
          <div style={{marginTop: '10px', marginBottom: '5px'}}>
          <h5 style={{textAlign: 'center'}}> Useful Links </h5>
          {jsonFile.links.map(({label, link}) => {
            return (
              <div key={label}><Link className='btn btn-secondary btn-link btn-block' to={link}>{label}</Link></div>
            )
          })}
          </div>
        }

        var checkRepeatErrors = function() {
          var errors=this.repeatError
          var invalidFields = ''
          console.log(this)
          console.log(errors)
          if(errors) {
            Object.values(errors).forEach((repeatable, repeatIndex) => {
              repeatable.forEach((qSet, qSetIndex) => {
                if (qSet.includes(true)) {
                  var indecies = qSet.map((value, index) => index)
                  qSet.forEach((val, index) => {
                    if(!val) {
                      indecies[index] = -1
                    }
                  })
                  indecies = indecies.filter(ind => ind>=0)
                  console.log(jsonFile.name, jsonFile.repeat[repeatIndex].name, qSetIndex)
                  this.props.openCollapse(jsonFile.name, jsonFile.repeat[repeatIndex].name, qSetIndex)
                }
              })
            })
          }
        }

  		return(
      <div>
        <div className='lower-page'>
        <h2 className='page-title text-center'> {jsonFile.title} </h2>
          {repeated}
          {fields}
  			  <button type="submit" onClick={checkRepeatErrors.bind(this)}className="btn btn-primary">Add to Budget</button>
  			  <Link to="/" className="btn btn-danger">Cancel</Link>
          {links}
        </div>
      </div>
  		);
  	}
}

function mapStateToProps(state) {
  return {
    budget: state.form,
    opened: state.opener,
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
