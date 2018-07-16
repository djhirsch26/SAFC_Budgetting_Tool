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
      "name": "travel_events",
      "removeButton": "Remove Event",
      "values": [
      {
        "label" : "Name of Event",
        "name": "name",
        "type": "text",
        "errorMessage": "Enter a name for this event"
      },
      {
        "label" : "Does the event meet all the following:",
        "name": "criteria",
        "type": "checkbox",
        "pdf_label": "Meets Required Criteria?",
        "errorMessage": "Must meet the following criteria",
        "pdf": value => value ? 'Yes' : No,
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
        "name": "price_quote",
        "type": "file"
      },
      {
        "label": "Proof of Event (Must Include)",
        "name": "proof_of_event",
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
        "name": "miles (one way)",
        "type": "number",
        "errorMessage": "must have some amount of miles",
        "pdf": distance => distance + ' mi',
        "calculate": {
          "name": "max_funding",
          "function": function(value, allValues, index) {
              if (allValues["travel_events"]) {
                var miles = numeric(value, allValues["travel_events"][index].miles)
                return Math.round(miles * 2 * FUNDING_PER_MILE*100)/100
              }
              return 0
            }
          }
      },
      {
        "label": "Max Funding",
        "name": "max_funding",
        "type": "calculated",
        "display": monetary,
        "pdf": price => '$' + price,
      }
      ]
    }
  ],
  "single": []
}
