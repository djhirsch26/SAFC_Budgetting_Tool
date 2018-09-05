
import {
  DURABLE,
  TRAVEL,
  LOCAL,
  PUBLICATION,
  ADMIN,
  SECTIONS,
  GENERAL
} from '../constants'

import {durable} from '../budgetSections/durableConfig'
import {travel} from '../budgetSections/travelConfig'
import {local} from '../budgetSections/localConfig'
import {admin} from '../budgetSections/adminConfig'
import {publication} from '../budgetSections/publicationConfig'
import {general} from '../budgetInfo/generalInfo'

var configs = {}
configs[DURABLE]=durable
configs[TRAVEL]=travel
configs[LOCAL]=local
configs[ADMIN]=admin
configs[PUBLICATION]=publication

import PDFGenerator from './pdfGenerator'

var fs = require('fs');
var jsPDF = require('jspdf');

export function prepareBudgetToSave(budget) {
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
          budget[key] = prepareBudgetToSave(budget[key])
        }
      }
      else if (typeof budget[key]=='array') {
        budget[key].forEach((section, index) => {
          budget[key][index] = prepareBudgetToSave(section)
        })
      }
    }
  }
  return budget
}

export function prepareForGeneral(config, values, budget) {
  var prepped = {...values}
  var total = 0
  SECTIONS.forEach(section => {
    total += budget[section].total
    prepped[section + '_total'] = budget[section].total
  })
  prepped['total'] = total
  return prepped
}

export function prepareForRender(config, values) {
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

      if (single.type == 'calculated') {
        calculated[single.name] = single.function(values)
      }
      if (single.monetary) {
        total += parseFloat(temp[single.name])
      }
    }
  }

  calculated.total = total
  calculated.max_funding = config.max ? Math.min(total, config.max) : total

  return calculated

}


export function makePDF(values) {
  var doc = new jsPDF('p','pt','a4');
  const TITLE_SIZE = 28
  const WIDTH = 8.27*72
  const HEIGHT = 11.69*72
  // const PTPERIN = 72
  const CENTER = WIDTH/2.0
  var counter = TITLE_SIZE + 5

  values = prepareBudgetToSave(values)
  var preppedValues = {}
  SECTIONS.forEach(section => {
    preppedValues[section] = prepareForRender(configs[section], values[section])
  })

  var prepped_general = prepareForRender(general, values[GENERAL])
  var general_values = prepareForGeneral(general, prepped_general, preppedValues)


  var generator = new PDFGenerator(doc)
  if (values[GENERAL]!={}) {
    generator.makeTitlePage(general, configs, general_values)
  }
  SECTIONS.forEach(section => {
    if (values[section]!={}) {
      generator.addPage()
      generator.makePDFGenerator(configs[section], preppedValues[section])
    }
  })

  generator.combinePDFs()

  return doc
}

export function savePDF(values) {
  var doc = makePDF(values)
  doc.save('Documentation')
}

export function writeBudget(budget) {
  var preppedBudget = prepareBudgetToSave(budget)
  var stringedBudget = JSON.stringify(preppedBudget, null, 4)

  fs.writeFile('./temp/tempStore.json', stringedBudget, 'utf8', function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  })
}
