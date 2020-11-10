import React from 'react'
import { useAllCorporateIdentities } from 'v2/hooks/identity/useAllCorporateIdentities'
import { MenuItem, Select } from '@material-ui/core'
import { queryStatusRenderer } from './renderUtils'

export const CorporateSelect = (props: any) => {
  const { data, status } = useAllCorporateIdentities(true)

  const queryStatus = queryStatusRenderer(status)
  if (queryStatus !== undefined) return queryStatus

  return (
    <Select {...props} style={{ minWidth: 100 }} label='SELECT ME'>
      <MenuItem disabled value={undefined}>
        Corporate
      </MenuItem>
      {data.list.map(({ _id, companyLegalName }) => {
        return (
          <MenuItem value={_id} key={_id}>
            {companyLegalName}
          </MenuItem>
        )
      })}
    </Select>
  )
}
