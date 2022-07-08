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
