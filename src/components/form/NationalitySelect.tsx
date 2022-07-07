import React from 'react'
import { renderSelectItems } from 'helpers/rendering'
import { NATIONALITIES_OPTS } from 'app/pages/identity/const'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { MenuItem } from '@mui/material'

export const NationalitySelect = (props: any): JSX.Element => {
  return (
    <>
      <InputLabel disabled={props.disabled}>{props.label}</InputLabel>
      <Select displayEmpty {...props} label={undefined}>
        <SelectItem disabled value={undefined}>
          Nationality
        </SelectItem>

        {props.isSingPass === true ? (
          <MenuItem value={props.singPassValue}>{props.singPassValue}</MenuItem>
        ) : (
          renderSelectItems(NATIONALITIES_OPTS)
        )}
      </Select>
    </>
  )
}
NationalitySelect.displayName = 'Select_NationalitySelect'
