import {
  PUBLICATION,
  PUBLICATION_CAP,
  PUBLICATION_FAQ,
  MIN_COPIES
} from '../constants'

export const publication = {
  "name": PUBLICATION,
  "title": "Publications",
  "save_text": "Save To Budget",
  "max": PUBLICATION_CAP,
  "repeat": [
        {
        "addButton": "Add Publication Expense",
        "defaultTriggerText": "Publication Expense",
        "name": "publication_expenses",
        "removeButton": "Remove Expense",
        "values": [
        {
        "label" : "Name of Expense",
        "name": "name",
        "errorMessage": "Enter a name for this expense",
        },
        {
          "label": "Description",
          "name": "description",
          "type": "textarea"
        },
        {
        "label": "How many copies will be printed?",
        "name": "copies",
        "type": "number",
        "min": MIN_COPIES,
        "min_error": "Must publish at least 100 copies"
        },
        {
          "label": "The pulication meets the following critirea",
          "errorMessage": "Must meet the above critirea",
          "name": "critirea",
          "type": "checkbox",
          "message": {
            "title": "",
            "type": "numeric",
            "list": [
              'Publication is distirbuted in the current semester',
              'Publication is accessible and distributed to the Cornell Community'
            ]
          }
        },
        {
          "label": "Price",
          "name": "price",
          "monetary": true,
          "type": "number",
          "errorMessage": "Must give price for this expense"
        },
        {
          "label": "Price Quote",
          "name": "price_quote",
          "type": "file",
          "accept": "application/pdf",
          "errorMessage": "Must have price quote",
        },
        {
          "label": "Please upload a past copy of the publication or an outline of the proposed issue",
          "name": "past_copy",
          "type": "file",
          "accept": "application/pdf",
          "errorMessage": "Must give a past_copy/proposal"
        }
      ]
    }
  ],

  "links": [
    {
      "label": "Publication FAQ",
      "link": PUBLICATION_FAQ
    }
  ],
}
