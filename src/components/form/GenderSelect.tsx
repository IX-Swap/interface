import React from 'react'
import { renderSelectItems } from 'helpers/rendering'
import { GENDERS_OPTS } from 'app/pages/identity/const'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

export const GenderSelect = (props: any): JSX.Element => {
  return (
    <>
      <InputLabel disabled={props.disabled}>{props.label}</InputLabel>
      <Select
        {...props}
        label={undefined}
        displayEmpty
        renderValue={value => {
          const item = GENDERS_OPTS.find(({ value: v }) => v === value)
          return item?.label
        }}
      >
        <SelectItem disabled value={undefined}>
          Gender
        </SelectItem>
        {renderSelectItems(GENDERS_OPTS)}
      </Select>
    </>
  )
}
GenderSelect.displayName = 'Select_GenderSelect'
