import { IndividualIdentity } from 'app/pages/identity/types/forms'

const fundSourceList = [
  'Inheritance/Gifts',
  'Investments',
  'Interest/Dividends',
  'Property',
  'Allowances/Spouse',
  'Employment',
  'Pension',
  'Retirement Benefits',
  'Others'
]

export const getFundSourceDefaults = () => {
  return fundSourceList.map(name => ({ name, checked: false, value: 0 }))
}

export const getFundSource = (identity: IndividualIdentity) => {
  if (typeof identity.sourceOfFund === 'string') {
    return identity.sourceOfFund
  }
  if (
    identity === undefined ||
    identity.sourceOfFund === undefined ||
    identity.sourceOfFund.length < 1
  ) {
    return getFundSourceDefaults()
  }

  return identity.sourceOfFund.map((value, index) => ({
    ...value,
    name: fundSourceList[index]
  }))
}
