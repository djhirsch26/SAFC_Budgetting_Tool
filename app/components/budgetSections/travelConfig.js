import {
  numeric,
  monetary
} from '../normalization'

import {
  FUNDING_PER_MILE
} from '../../constants'

export const travel = {
  "name": "travel",
  "title": "Travel Events",
  "repeat": [
    {
      "addButton": "Add Travel Event",
      "defaultTriggerText": "Travel Event",
      "name": "Travel Events",
      "removeButton": "Remove Event",
      "values": [
      {
        "label" : "Name of Event",
        "name": "Name",
        "type": "text",
        "errorMessage": "Enter a name for this event"
      },
      {
        "label" : "Does the event meet all the following:",
        "name": "Critirea",
        "type": "checkbox",
        "errorMessage": "Must meet the following Critirea",
        "message": {
          "title": "",
          "list": [
            "The event occurs within the dates of the semester",
            "The event is outside of Tompkins County",
            "The event is not a retreat or has the sole purpose of team-building",
            "The event is not a social event",
            "The event is not for raising money for profit or charity",
            "The event does not have a primary purpose of conversion/worhsip"
          ]
        }
      },
      {
        "label": "Price Quote (if requesting registration fees)",
        "name": "Price Quote",
        "type": "file"
      },
      {
        "label": "Proof of Event (Must Include)",
        "name": "Proof of Event",
        "type": "file",
        "errorMessage": "Must have proof of event",
        "message": {
          "title": "",
          "type": "numeric",
          "list": [
            'Date of Event',
            'Location of Event',
            'Event Organizer'
          ]
        }
      },
      {
        "label" : "Miles (One Way)",
        "name": "Miles",
        "normalize": numeric,
        "errorMessage": "must have some amount of miles",
        "calculate": {
          "name": "max_funding",
          "function": function(value, allValues, index) {
              if (allValues.travelEvents) {
                var miles = numeric(value, allValues.travelEvents[index].miles)
                return Math.round(miles * 2 * FUNDING_PER_MILE*100)/100
              }
              return 10
            }
          }
      },
      {
        "label": "Max Funding",
        "name": "Max Funding",
        "type": "calculated",
        "display": monetary
      }
      ]
    }
  ],
  "single": []
}
