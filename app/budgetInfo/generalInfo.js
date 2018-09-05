import {
  GENERAL,
  TIERS,
  TIER_FUNDING
} from '../constants'

export const general = {
  "name": GENERAL,
  "title": "Organization Info",
  "type": GENERAL,
  "save_text": "Save To Budget",
  "single": [
    {
      "name": "organization_name",
      "label": "Organization Name",
      // "max": 60,
      "type": "text",
      "errorMessage": "Please Enter Your Organization's Name"
    },
    {
      "name": "organization_tier",
      "label": "Organization Tier",
      "type": "select",
      "options": TIERS,
      "errorMessage": "Please Select A Tier"
    },
    {
      "name": "tier_cap",
      "label": "Tier Cap",
      "type": "calculated",
      "function": function(values) {
        return TIER_FUNDING[values["organization_tier"]]
      }
    }
  ]

  // "links": [
  //   {
  //     "label": "Budget Guidelines",
  //     "link": ADMIN_FAQ
  //   }
  // ],
}
