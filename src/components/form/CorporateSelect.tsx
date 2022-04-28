import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { renderValue } from 'helpers/forms'
import React from 'react'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { queryStatusRenderer } from './renderUtils'

export const CorporateSelect = (props: any) => {
  const { data, status } = useAllCorporates({ all: true, status: 'Approved' })

  const queryStatus = queryStatusRenderer(status)
  if (queryStatus !== undefined) return queryStatus
  const renderName = (value: any) => {
    return renderValue({
      value,
      list: data?.list,
      extractor: (item: CorporateIdentity) => item.companyLegalName
    })
  }
  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...props}
        style={{ minWidth: 100 }}
        label={undefined}
        placeholder={String(props.label)}
        renderValue={renderName}
        displayEmpty
      >
        <SelectItem disabled value={undefined}>
          Corporate
        </SelectItem>
        {data.list.map(({ _id, companyLegalName }) => (
          <SelectItem value={_id} key={_id}>
            {companyLegalName}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
CorporateSelect.displayName = 'Select_CorporateSelect'
