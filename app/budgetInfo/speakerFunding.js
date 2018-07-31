import {
  LOCAL_CALC_NAME,
  SPEAKER_MILE,
  SPEAKER_NIGHT,
  SPEAKER_FOOD,
  LOCAL
} from '../constants'

export const speaker_calc = {
  "name": LOCAL_CALC_NAME,
  "isCalculator": true,
  "title": "Speaker Funding Calculator",
  "single": [
        {
          "label": "Number of Nights Speaker is Staying",
          "name": "nights",
          "type": "number",
        },
        {
          "label": "Number of Miles Speaker is Travelling (One Way)",
          "name": "miles",
          "type": "number"
        },
        {
          "name": "expected_travel",
          "label": "Expected Travel Allocation",
          "type": "calculated",
          "monetary": true,
          "function": function(values) {
            var amount = values['miles'] * 2 * SPEAKER_MILE
            return isNaN(amount) ? 0 : amount
          }
        },
        {
          "name": "expected_lodging",
          "label": "Expected Lodging Allocation",
          "type": "calculated",
          "monetary": true,
          "function": function(values) {
            var amount = values['nights'] * SPEAKER_NIGHT
            return isNaN(amount) ? 0 : amount
          }
        },
        {
          "name": "expected_food",
          "label": "Expected Food Allocation",
          "type": "calculated",
          "monetary": true,
          "function": function(values) {
            var amount = values['nights'] * SPEAKER_FOOD
            return isNaN(amount) ? 0 : amount
          }
        }
  ],

  "links": [
    {
      "label": "Return to Local Events",
      "link": LOCAL
    }
  ],
}
