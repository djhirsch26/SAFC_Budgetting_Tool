import {
  DURABLE,
  DURABLE_COMMON
} from '../constants'

import {
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
        "max": 60,
        "errorMessage": "Enter a name for this good",
        "defaultValue": "HI"
        },
        {
          "label": "Description",
          "name": "description",
          "type": "textarea"
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
          "accept": "application/pdf",
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
      "accept": "application/pdf",
      "errorMessage": "Please Upload the Last 3 Years of Durable Goods "
    },
  ],

  "links": [
    {
      "label": "Commonly Accepted Durable Goods",
      "link": DURABLE_COMMON
    }
  ],
}
