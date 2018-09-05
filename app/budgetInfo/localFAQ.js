import {
  LOCAL,
  SPEAKER_NIGHT,
  SPEAKER_SECONDARY_NIGHT,
  SPEAKER_MILE,
  SPEAKER_FOOD,
  LOCAL_ELECTRONICS,
  LOCAL_CHALK
} from '../constants'

export const FAQ = {
  "title": "Local Expenses FAQ",
  "list": [
    {
      "title": "All Events Must",
      "list": [
        "Occur between the first and last day of classes",
        "Occur on  a weekday when classes are in session or a weekend that is not part of a university holiday such as Fall Break or Spring Break",
        {
          "title": "Be one of:",
          "list": [
            "A practice session for athletic or performance organizations",
            "A public event open to the Cornell Community to the extent permitted by spacial, temporal, or financial constraints"
          ]
        },
        {
          "title": "Not have a primary or substantive purpose of:",
          "list": [
            "Conversion/Worship",
            "Influencing Legislation",
            "Partisan Political Activity",
            "Raising funds for profit",
            "Raising funds for charity, unless the event has another equally substantive purpose related to the missing of the organization",
            "Social activity",
          ]
        },
        "Comply with the use of University Property Policy if it occurs on campus"
      ]
    },
    {
      "title": "Permitted Expenses",
      "list": [
        {
          "title": "Guest Performers Including",
          "list": [
            "honorarium, engagement, or coaching fee",
            "transport",
            "lodging",
            "meals"
          ]
        },
        "Venue Rental",
        "Professional Event Production Services",
        "Supplies and Materials Essential to the Event",
        "Media Rental and licensing fee",
        "Copies and Chalk",
        "Security Fee",
        "Professional Video/Sound Recording or photography expenses"
      ]
    },
    {
      "title": "Prohibited Expenses",
      "list": [
        "Durable goods and items with a typical or expected useful life of more than one year",
        "Duplicates functionality or service already available on campus (ex. utensils, cameras)",
        "Food other than meals for Performers as provided in permitted expenses",
        "Travel expenses for members within the organization to a location within Tompkins County",
        {
          "title": "Honorarium or engagement fee if paid to",
          "list": [
            "A speaker or performer with whom another organization has negotiated an engagement fee, documented by a Letter of Intent filed with the Commission, for which it is seeking funding from the Commission",
            "A university Student",
            "A university Employee",
            "An alumnus who graduated within 5 years",
            "A parent, adopted parent, sibling, step-sibling, or child of a Cornell Student",
          ]
        },
        "Any items that are given away",
        "Entry Fees/Member dues paid to another SAFC funded organization"
      ]
    },
    {
      "title": "Application Requirements",
      "list": [
        "Price Quote Documentation for Each Individual Expense",
        "A completed letter of intent Form for each guest performer for which it requires funds in this category. A Letter of Intent Form is a form available online from the SAFC, which must be completed by the speaker or performer and the group organizing the event. It is not binding upon either party, but it documents the good-faith intent of the parties to organize the event."
      ]
    },
    {
      "title": "Maximum Funding",
      "list": [
        "Lodging for Guest Performers may not exceed $" + SPEAKER_NIGHT + " per night and $" + SPEAKER_SECONDARY_NIGHT + " per person for any additional persons if the guest performer is a group of people.",
        "Meals for guests may not exceed $" + SPEAKER_FOOD + " per person per day",
        "Travel expenses for guest performers may not exceed the eligible amount under the Internal Revenue Service rate, $" + SPEAKER_MILE,
        "Expenditures for electronics (i.e. cameras, speakers, etc.) are capped at $" + LOCAL_ELECTRONICS,
        "Copies and chalk for publicity may not exceed $" + LOCAL_CHALK + " per event."
      ]
    },
    "If an event is allocated funding, the Commission will provide up to two complementary, vertical eighth-page advertisements or the online equivalent in value to publicize the event in the Cornell Daily Sun. Funding is not allocated for these ads in the organization’s funding request, but the organization may pay for the ads using the Cornell Daily Sun Advertisement Authorization Form."
  ]
}

export const links = [
  {
    "label": "Return to Local Expenses",
    "link": LOCAL
  }
]
