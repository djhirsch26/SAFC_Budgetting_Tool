import {
  numeric,
  monetary
} from '../normalization'

import {
  FUNDING_PER_MILE
} from '../../constants'

export const travel = {
  "name": "travel",
  "Title": "Travel Events",
  "repeat": [
    {
      "addButton": "Add Travel Event",
      "defaultTriggerText": "Travel Event",
      "name": "travelEvents",
      "removeButton": "Remove Event",
      "values": [
      {
        "label" : "Name of Event",
        "name": "name",
        "type": "text",
        "errorMessage": "Enter a name for this event"
      },
      {
        "label" : "Does the Event occur within the dates of the semester",
        "name": "dates",
        "type": "checkbox",
        "errorMessage": "Event must occur during semester"
      },
      {
        "label" : "Miles (One Way)",
        "name": "miles",
        "normalize": numeric,
        "errorMessage": "must have some amount of miles",
        "calculate": {
          "name": "max_funding",
          "function": function(value, allValues, index) {
              console.log(value, allValues, index)
              if (allValues.travelEvents) {
                console.log('HI', allValues.travelEvents, allValues.travelEvents[index].miles)
                var miles = numeric(value, allValues.travelEvents[index].miles)
                return Math.round(miles * 2 * FUNDING_PER_MILE*100)/100
              }
              return 10
            }
          }
      },
      {
        "label": "Max Funding",
        "name": "max_funding",
        "type": "calculated",
        "display": monetary
      }
      ]
    }
  ],
  "single": []
}
