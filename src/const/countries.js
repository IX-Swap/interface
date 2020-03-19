
import countryNamesJson from 'country-json/src/country-by-name.json'

const arrToOpts = arr => arr.map(value => ({ value, label: value }))
export const COUNTRIES = countryNamesJson.map(c => c.country)
export const COUNTRIES_OPTS = arrToOpts(COUNTRIES)
