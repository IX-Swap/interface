import countryNamesJson from 'country-json/src/country-by-name.json'
import { arrToOpts } from '../../../../helpers/arrays'

export const COUNTRIES = countryNamesJson.map(
  (c: { country: string }) => c.country
)
export const COUNTRIES_OPTS = arrToOpts(COUNTRIES)
