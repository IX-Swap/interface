import React from 'react'
import { MenuItem, Select } from '@mui/material'

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
  { name: 'Others (Please specify)', value: 'others' }
]

export const LegalEntityStatusSelect = (props: any) => {
  return (
    <Select {...props} style={{ minWidth: 100 }} label={props.label}>
      <MenuItem disabled value={undefined}>
        Legal Entity Status
      </MenuItem>
      {LEGAL_ENTITY_STATUS_LIST.map(({ value, name }) => {
        return (
          <MenuItem value={value} key={value}>
            {name}
          </MenuItem>
        )
      })}
    </Select>
  )
}
