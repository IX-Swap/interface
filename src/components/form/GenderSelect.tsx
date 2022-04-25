import React from 'react'
// import { MenuItem, Select } from '@mui/material'
import { renderSelectItems } from 'helpers/rendering'
import { GENDERS_OPTS } from 'app/pages/identity/const'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

export const GenderSelect = (props: any): JSX.Element => {
  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select {...props} label={undefined} displayEmpty>
        <SelectItem disabled value={undefined}>
          Gender
        </SelectItem>
        {renderSelectItems(GENDERS_OPTS)}
      </Select>
    </>
  )
}
