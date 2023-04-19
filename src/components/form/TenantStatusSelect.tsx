import React from 'react'
import { renderSelectItems } from 'helpers/rendering'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

const STATUS = [
  {
    label: 'Under Review',
    value: 'UNDER_REVIEW'
  },
  {
    label: 'Approved',
    value: 'APPROVED'
  },
  {
    label: 'Live',
    value: 'LIVE'
  },
  {
    label: 'Disabled',
    value: 'DISABLED'
  }
]

export const TenantStatusSelect = (props: any): JSX.Element => {
  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...props}
        label={undefined}
        placeholder={String(props.label)}
        displayEmpty
        renderValue={selected => {
          const filtered = STATUS.find(status => status.value === selected)

          return typeof filtered !== 'undefined' ? filtered.label : selected
        }}
      >
        <SelectItem disabled value={undefined}>
          Status
        </SelectItem>
        {renderSelectItems(STATUS)}
      </Select>
    </>
  )
}

TenantStatusSelect.displayName = 'Select_TenantStatusSelect'
