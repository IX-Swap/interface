import { arrToOpts } from 'helpers/arrays'
import nationalities from 'app/pages/identity/const/nationalities'
import fundSources from 'app/pages/identity/const/fundSources'

export * from 'app/pages/identity/const/countries'
export const MARITAL_STATUSES = ['Married', 'Widowed', 'Separated', 'Single']
export const MARITAL_STATUSES_OPTS = arrToOpts(MARITAL_STATUSES)
export const GENDERS = ['M', 'F', 'O']
export const GENDERS_OPTS = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
  { value: 'O', label: 'Unknown' }
]
export const YES_OR_NO_OPTS = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' }
]

export const ALPHA_NUMERIC_OR_EMPTY_REGEX = /^([a-z0-9]|(?![\s\S]))+$/i

export const NATIONALITIES_OPTS = arrToOpts(nationalities)

export const FUNDSOURCES_OPTS = arrToOpts(fundSources)
