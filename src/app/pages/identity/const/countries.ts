import countryNamesJson from 'country-json/src/country-by-name.json'
import { arrToOpts } from 'helpers/arrays'

countryNamesJson.splice(216, 0, { country: 'Taiwan' })
export const COUNTRIES = countryNamesJson.map(
  (c: { country: string }) => c.country
)

export const COUNTRIES_OPTS = arrToOpts(COUNTRIES)
