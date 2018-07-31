import {DURABLE} from '../constants'

import {
  numeric,
  monetary
} from '../utils/normalization'

export const durable = {
  "name": DURABLE,
  "title": "Durable Goods",
  "save_text": "Save To Budget",
  "repeat": [
    {
      "addButton": "Add Durable Good",
      "defaultTriggerText": "Durable Good",
      "name": "durable_goods",
      "removeButton": "Remove Good",
      "values": [
        {
        "label" : "Name of Good",
        "name": "name",
        "errorMessage": "Enter a name for this good",
        "defaultValue": "HI"
        },
        {
          "label": "Where will this item be stored (must be on Cornell's Campus)",
          "name": "location",
          "errorMessage": "Please Enter a location"
        },
        {
          "label": "Does the good have a life of more than 1 year",
          "name": "life_span",
          "type": "checkbox",
          "pdf_label": "Meets Required Criteria?",
          "pdf": value => value ? 'Yes' : No,
          "defaultValue": "checked",
          "errorMessage": "Good must have a life of at least 1 year"
        },
        {
          "label": "Price",
          "name": "price",
          "monetary": true,
          "type": "number",
          "pdf": monetary,
          "errorMessage": "Must give price for this good"
        },
        {
          "label": "Supporting Documentation",
          "name": "supporting_documentation",
          "type": "file",
          "errorMessage": "Please Upload Supporting Documentation"
        }
      ]
    }
  ],

  "single": [
    {
      "label" : "Last 3 Years of Goods",
      "name": "last_3_years_of_goods",
      "type": "file",
      "errorMessage": "Please Upload the Last 3 Years of Durable Goods "
    },
    {
      "label" : "Remove Me",
      "name": "remove_me",
      "type": "text",
      "errorMessage": "I am a must "
    },
    {
      "label" : "Optional0",
      "name": "optional0",
      "type": "text",
    },
    {
      "label" : "Optional1",
      "name": "optional1",
      "type": "text",
    },
    {
      "label" : "Optional2",
      "name": "optional2",
      "type": "text",
    },
    {
      "label" : "Optional3",
      "name": "optional3",
      "type": "text",
    },
    {
      "label" : "Optional4",
      "name": "optional4",
      "type": "text",
    },
    {
      "label" : "Optional5",
      "name": "optional5",
      "type": "text",
    },
    {
      "label" : "Optional6",
      "name": "optional6",
      "type": "text",
    },
    {
      "label" : "Optional7",
      "name": "optional7",
      "type": "text",
    },
    {
      "label" : "Optional8",
      "name": "optional8",
      "type": "text",
    }

  ],

  "links": [
    {
      "label": "Commonly Accepted Durable Goods",
      "link": "durable/common"
    }
  ],
}
