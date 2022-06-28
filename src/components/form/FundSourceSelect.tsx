import { FUNDSOURCES_OPTS } from 'app/pages/identity/const'
import { renderSelectItems } from 'helpers/rendering'
import React from 'react'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const FundSourceSelect = (props: any): JSX.Element => {
  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...props}
        label={undefined}
        placeholder='Select Source'
        displayEmpty
      >
        <SelectItem disabled value={undefined}>
          Source of funds
        </SelectItem>
        {renderSelectItems(FUNDSOURCES_OPTS)}
      </Select>
    </>
  )
}

FundSourceSelect.displayName = 'Select_FundSourceSelect'
