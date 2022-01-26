import React from 'react'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'
import { MenuItem, Select } from '@mui/material'
import { queryStatusRenderer } from './renderUtils'

export const CorporateSelect = (props: any) => {
  const { data, status } = useAllCorporates({ all: true, status: 'Approved' })

  const queryStatus = queryStatusRenderer(status)
  if (queryStatus !== undefined) return queryStatus

  return (
    <Select {...props} style={{ minWidth: 100 }} label={props.label}>
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
