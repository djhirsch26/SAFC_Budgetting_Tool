import {
  ADMIN_CAP,
  DAILY_SUN_CAP,
  DAILY_SUN_PRICE,
  ADMIN
  } from '../constants'

export const FAQ = {
  "title": "Administrative Expenses FAQ",
  "list": [
    {
      "title": "Important Information",
      "list": [
        "Administrative Expenses are capped at $" + ADMIN_CAP,
        "There is no documentation required",
        "Groups can request up to " + DAILY_SUN_CAP + " Daily Sun Ads for Recruitment",
        "Adds, if requested, are $" + DAILY_SUN_PRICE + " per ad"
      ]
    },
    {
      "title": "Typically Permitted Expenses",
      "list": [
        "Website Hosting",
        "Copying and Printing Services",
        "Chalk",
        "Advertising for Recruitment",
        "Repairs and maintenance of Equipment",
        "Facebook Advertising",
        "Stickers",
        "Willard Straight Hall mailbox rental fee"
      ]
    },
    {
      "title": "Typically Prohibited Expenses",
      "list": [
        "AV Equipment",
        "Team Dues",
        "Items with a useful life > 1 Year",
        "Clubfest Registration"
      ]
    }
  ]
}

export const links = [
  {
    "label": "Return to Administrative Expenses",
    "link": ADMIN
  }
]
