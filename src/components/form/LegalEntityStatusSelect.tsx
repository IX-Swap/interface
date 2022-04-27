import React from 'react'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { useFormContext } from 'react-hook-form'

export const LEGAL_ENTITY_STATUS_LIST = [
  { name: 'Public Company', value: 'publicCompany' },
  { name: 'Private Company', value: 'privateCompany' },
  { name: 'Limited Liability Company', value: 'limitedLiabilityCompany' },
  { name: 'Partnership', value: 'partnership' },
  {
    name: 'Limited Liability Partnership',
    value: 'limitedLiabilityPartnership'
  },
  { name: 'Society', value: 'society' },
  { name: 'Trust', value: 'trust' },

  {
    name: 'Exempt Private Company Limited by Shares',
    value: 'exemptPrivateCompanyLimitedByShares'
  },
  { name: 'Limited (LTD)', value: 'limitedLTD' },
  {
    name: 'Private Company Limited by Shares (LTD)',
    value: 'privateCompanyLimitedBySharesLTD'
  },
  { name: 'Proprietary Limited (PTY LTD)', value: 'proprietaryLimitedPTYLTD' },
  {
    name: 'Public Company Limited by Guarantee',
    value: 'publicCompanyLimitedByGuarantee'
  },
  {
    name: 'Public Company Limited by Shares',
    value: 'publicCompanyLimitedByShares'
  },
  { name: 'Public Limited Company (PLC)', value: 'publicLimitedCompanyPLC' },

  { name: 'Others (Please specify)', value: 'others' }
]

export const LegalEntityStatusSelect = (props: any) => {
  const { watch } = useFormContext()
  const legalEntityStatus = watch('legalEntityStatus')
  const selectValue = LEGAL_ENTITY_STATUS_LIST.find(
    item => item.value === legalEntityStatus
  )?.name
  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...props}
        style={{ minWidth: 100 }}
        label={undefined}
        value={selectValue}
      >
        <SelectItem disabled value={undefined}>
          Legal Entity
        </SelectItem>
        {LEGAL_ENTITY_STATUS_LIST.map(({ value, name }) => {
          return (
            <SelectItem value={value} key={value}>
              {name}
            </SelectItem>
          )
        })}
      </Select>
    </>
  )
}
