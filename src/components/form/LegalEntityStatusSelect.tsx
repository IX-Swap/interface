import React from 'react'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { renderSelectItems } from 'helpers/rendering'

export const LEGAL_ENTITY_STATUS_LIST = [
  { label: 'Public Company', value: 'publicCompany' },
  { label: 'Private Company', value: 'privateCompany' },
  { label: 'Limited Liability Company', value: 'limitedLiabilityCompany' },
  { label: 'Partnership', value: 'partnership' },
  {
    label: 'Limited Liability Partnership',
    value: 'limitedLiabilityPartnership'
  },
  { label: 'Society', value: 'society' },
  { label: 'Trust', value: 'trust' },

  {
    label: 'Exempt Private Company Limited by Shares',
    value: 'exemptPrivateCompanyLimitedByShares'
  },
  { label: 'Limited (LTD)', value: 'limitedLTD' },
  {
    label: 'Private Company Limited by Shares (LTD)',
    value: 'privateCompanyLimitedBySharesLTD'
  },
  { label: 'Proprietary Limited (PTY LTD)', value: 'proprietaryLimitedPTYLTD' },
  {
    label: 'Public Company Limited by Guarantee',
    value: 'publicCompanyLimitedByGuarantee'
  },
  {
    label: 'Public Company Limited by Shares',
    value: 'publicCompanyLimitedByShares'
  },
  { label: 'Public Limited Company (PLC)', value: 'publicLimitedCompanyPLC' },

  { label: 'Others (Please specify)', value: 'others' }
]

export const LegalEntityStatusSelect = (props: any) => {
  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...props}
        style={{ minWidth: 100 }}
        label={undefined}
        renderValue={value => {
          const item = LEGAL_ENTITY_STATUS_LIST.find(
            ({ value: v }) => v === value
          )
          return item?.label
        }}
      >
        <SelectItem disabled value={undefined}>
          Legal Entity
        </SelectItem>
        {renderSelectItems(LEGAL_ENTITY_STATUS_LIST)}
      </Select>
    </>
  )
}
