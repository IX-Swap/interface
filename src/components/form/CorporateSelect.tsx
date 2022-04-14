import React from 'react'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'
import { queryStatusRenderer } from './renderUtils'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const CorporateSelect = (props: any) => {
  const { data, status } = useAllCorporates({ all: true, status: 'Approved' })

  const queryStatus = queryStatusRenderer(status)
  if (queryStatus !== undefined) return queryStatus

  return (
    <Select {...props} style={{ minWidth: 100 }} label={props.label}>
      <SelectItem disabled value={undefined}>
        Corporate
      </SelectItem>
      {data.list.map(({ _id, companyLegalName }) => (
        <SelectItem value={_id} key={_id}>
          {companyLegalName}
        </SelectItem>
      ))}
    </Select>
  )
}
