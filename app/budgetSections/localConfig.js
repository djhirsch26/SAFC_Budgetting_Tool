import {
  LOCAL,
  LOCAL_CALC
} from '../constants'

export const local = {
  "name": LOCAL,
  "title": "Local Events",
  "save_text": "Save To Budget",
  "repeat": [
    {
      "addButton": "Add Local Event Expense",
      "defaultTriggerText": "Local Expense",
      "name": "local_expense",
      "removeButton": "Remove Expense",
      "values": [
        {
        "label" : "Name of Expense",
        "name": "name",
        "errorMessage": "Enter a name for this item",
        },
        {
          "label": "Price",
          "name": "price",
          "monetary": true,
          "type": "number",
          "errorMessage": "Must give price for this good"
        }
      ]
    }
  ],

  "links": [
    {
      "label": "Speaker Funding Calculator",
      "link": LOCAL_CALC
    }
  ],
}
