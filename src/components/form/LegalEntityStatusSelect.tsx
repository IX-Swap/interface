import React from 'react'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { useFormContext } from 'react-hook-form'
import { renderValue } from 'helpers/forms'
import { Param } from 'types/networks'

export const LEGAL_ENTITY_STATUS_LIST = [
  { key: 'Public Company', value: 'publicCompany', _id: 'publicCompany' },
  { key: 'Private Company', value: 'privateCompany', _id: 'privateCompany' },
  {
    key: 'Limited Liability Company',
    value: 'limitedLiabilityCompany',
    _id: 'limitedLiabilityCompany'
  },
  { key: 'Partnership', value: 'partnership', _id: 'partnership' },
  {
    key: 'Limited Liability Partnership',
    value: 'limitedLiabilityPartnership',
    _id: 'limitedLiabilityPartnership'
  },
  { key: 'Society', value: 'society', _id: 'society' },
  { key: 'Trust', value: 'trust', _id: 'trust' },

  {
    key: 'Exempt Private Company Limited by Shares',
    value: 'exemptPrivateCompanyLimitedByShares',
    _id: 'exemptPrivateCompanyLimitedByShares'
  },
  { key: 'Limited (LTD)', value: 'limitedLTD', _id: 'limitedLTD' },
  {
    key: 'Private Company Limited by Shares (LTD)',
    value: 'privateCompanyLimitedBySharesLTD',
    _id: 'privateCompanyLimitedBySharesLTD'
  },
  {
    key: 'Proprietary Limited (PTY LTD)',
    value: 'proprietaryLimitedPTYLTD',
    _id: 'proprietaryLimitedPTYLTD'
  },
  {
    key: 'Public Company Limited by Guarantee',
    value: 'publicCompanyLimitedByGuarantee',
    _id: 'publicCompanyLimitedByGuarantee'
  },
  {
    key: 'Public Company Limited by Shares',
    value: 'publicCompanyLimitedByShares',
    _id: 'publicCompanyLimitedByShares'
  },
  {
    key: 'Public Limited Company (PLC)',
    value: 'publicLimitedCompanyPLC',
    _id: 'publicLimitedCompanyPLC'
  },

  { key: 'Others (Please specify)', value: 'others', _id: 'others' }
]

export const LegalEntityStatusSelect = (props: any) => {
  const { watch } = useFormContext()
  const legalEntityStatus = watch('legalEntityStatus')
  const selectValue = LEGAL_ENTITY_STATUS_LIST.find(
    item => item.value === legalEntityStatus
  )?.key

  const renderName = (value: any) => {
    return renderValue({
      value,
      list: LEGAL_ENTITY_STATUS_LIST,
      extractor: (item: Param) => item.key
    })
  }
  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...props}
        style={{ minWidth: 100 }}
        label={undefined}
        value={selectValue}
        renderValue={renderName}
      >
        <SelectItem disabled value={undefined}>
          Legal Entity
        </SelectItem>
        {LEGAL_ENTITY_STATUS_LIST.map(({ value, key }) => {
          return (
            <SelectItem value={value} key={value}>
              {key}
            </SelectItem>
          )
        })}
      </Select>
    </>
  )
}
LegalEntityStatusSelect.displayName = 'Select_LegalEntityStatusSelect'
