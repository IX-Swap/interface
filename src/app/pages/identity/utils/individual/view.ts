import { IndividualIdentity } from 'app/pages/identity/types/forms'

const fundSourceList = [
  'Inheritance/Gift',
  'Interest/Dividend',
  'Property',
  'Allowance/Spousal Income',
  'Employment',
  'Pension',
  'Retirement Benifits',
  'Others'
]

export const getFundSourceDefaults = () => {
  return fundSourceList.map(name => ({ name, checked: false, value: 0 }))
}

export const getFundSource = (identity: IndividualIdentity) => {
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
