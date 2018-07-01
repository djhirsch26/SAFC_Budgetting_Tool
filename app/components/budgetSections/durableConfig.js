export const durable = {
  "name": "durable",
  "title": "Durable Goods",
  "repeat": [
    {
      "addButton": "Add Durable Good",
      "defaultTriggerText": "Durable Good",
      "name": "goods",
      "removeButton": "Remove Good",
      "values": [
        {
        "label" : "Name of Good",
        "name": "name",
        "errorMessage": "Enter a name for this good",
        "defaultValue": "HI"
        },
        {
          "label": "Where will this item be stored",
          "sublabel": "This must be a location on Cornell's Campus",
          "name": "location",
          "errorMessage": "Please Enter a location"
        },
        {
          "label": "Does the good have a life of more than 1 year",
          "name": "life",
          "type": "checkbox",
          "defaultValue": "checked",
          "errorMessage": "Good must have a life of at least 1 year"
        },
        {
          "label": "Supporting Documentation",
          "name": "supporting",
          "type": "file",
          "errorMessage": "Please Upload Supporting Documentation"
        }
      ]
    }
  ],

  "single": [
    {
      "label" : "Last 3 Years of Goods",
      "name": "lastThree",
      "type": "file",
      "errorMessage": "Please Upload the Last 3 Years of Durable Goods "
    }
  ],

  "links": [
    {
      "label": "Commonly Accepted Durable Goods",
      "link": "durable/common"
    }
  ]
}