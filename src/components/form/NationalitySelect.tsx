import React from 'react'
import { renderSelectItems } from 'helpers/rendering'
import { NATIONALITIES_OPTS } from 'app/pages/identity/const'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

export const NationalitySelect = (props: any): JSX.Element => {
  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select displayEmpty {...props} label={undefined}>
        <SelectItem disabled value={undefined}>
          Nationality
        </SelectItem>
        {renderSelectItems(NATIONALITIES_OPTS)}
      </Select>
    </>
  )
}
