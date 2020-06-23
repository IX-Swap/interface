import countryNamesJson from 'country-json/src/country-by-name.json'
import arrToOpts from 'helpers/arrToOpts'

export const COUNTRIES = countryNamesJson.map((c) => c.country)
export const COUNTRIES_OPTS = arrToOpts(COUNTRIES)
