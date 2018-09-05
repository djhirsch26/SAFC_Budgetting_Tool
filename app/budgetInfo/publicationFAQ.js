import {
  PUBLICATION_CAP,
  MIN_COPIES,
  PUBLICATION
  } from '../constants'

export const FAQ = {
  "title": "Publications FAQ",
  "list": [
    {
      "title": "Important Information",
      "list": [
        "Publication Expenses are capped at $ " + PUBLICATION_CAP,
        "Groups must print at least " + MIN_COPIES + " of their publication",
        "Publications must be within the date of the current semester",
        "The price quote must show printing costs for the publication",
      ]
    }
  ]
}

export const links = [
  {
    "label": "Return to Administrative Expenses",
    "link": PUBLICATION
  }
]
