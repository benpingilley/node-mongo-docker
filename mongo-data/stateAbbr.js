/*
Wrote this script to convert the census data to be more useable.
Split Geography into City and State
Added new State Abbreviations to elimate hard coding in API
Removed unnecessary keys. "Id", "Id2", "Census", "Estimates Base"
*/

/*
Conversion Example:

{
   "Id": "1620000US0100124",
   "Id2": 100124,
   "Geography": "Abbeville city, Alabama",
   "Census": "2688",
   "Estimates Base": 2688,
   "2010": 2683,
   "2011": 2685,
   "2012": 2647,
   "2013": 2631,
   "2014": 2619,
   "2015": 2616,
   "2016": 2603
 }

 ...

 {
    "2010": 2683,
    "2011": 2685,
    "2012": 2647,
    "2013": 2631,
    "2014": 2619,
    "2015": 2616,
    "2016": 2603,
    "City": "Abbeville city",
    "State": "Alabama",
    "StateAbbr": "AL"
  }
*/

var fs = require('fs');
var util = require('util');
var json = JSON.parse(fs.readFileSync('./census.json', 'utf8'));

const states = {
  'Alabama': 'AL',
  'Alaska': 'AK',
  'American Samoa': 'AS',
  'Arizona': 'AZ',
  'Arkansas': 'AR',
  'Armed Forces Americas': 'AA',
  'Armed Forces Europe': 'AE',
  'Armed Forces Pacific': 'AP',
  'California': 'CA',
  'Colorado': 'CO',
  'Connecticut': 'CT',
  'Delaware': 'DE',
  'District of Columbia': 'DC',
  'Florida': 'FL',
  'Georgia': 'GA',
  'Guam': 'GU',
  'Hawaii': 'HI',
  'Idaho': 'ID',
  'Illinois': 'IL',
  'Indiana': 'IN',
  'Iowa': 'IA',
  'Kansas': 'KS',
  'Kentucky': 'KY',
  'Louisiana': 'LA',
  'Maine': 'ME',
  'Marshall Islands': 'MH',
  'Maryland': 'MD',
  'Massachusetts': 'MA',
  'Michigan': 'MI',
  'Minnesota': 'MN',
  'Mississippi': 'MS',
  'Missouri': 'MO',
  'Montana': 'MT',
  'Nebraska': 'NE',
  'Nevada': 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Northern Mariana Islands': 'NP',
  'Ohio': 'OH',
  'Oklahoma': 'OK',
  'Oregon': 'OR',
  'Pennsylvania': 'PA',
  'Puerto Rico': 'PR',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  'Tennessee': 'TN',
  'Texas': 'TX',
  'US Virgin Islands': 'VI',
  'Utah': 'UT',
  'Vermont': 'VT',
  'Virginia': 'VA',
  'Washington': 'WA',
  'West Virginia': 'WV',
  'Wisconsin': 'WI',
  'Wyoming': 'WY'
};

for (var key in json) {
  if (json.hasOwnProperty(key)) {
  	[city, state] = json[key]['Geography'].split(', ')
  	delete json[key]['Estimates Base'];
  	delete json[key]['Id'];
  	delete json[key]['Id2'];
  	delete json[key]['Census'];
  	delete json[key]['Geography'];
  	json[key]['City'] = city;
  	json[key]['State'] = state;
  	json[key]['StateAbbr'] = states[state]
  }
}

fs.writeFileSync('./census.json', JSON.stringify(json, null, 2));