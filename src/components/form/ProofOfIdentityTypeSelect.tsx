import React from 'react'
import { renderSelectItems } from 'helpers/rendering'
import { IDENTITY_OPTS } from 'app/pages/identity/const'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

export const ProofOfIdentityTypeSelect = (props: any): JSX.Element => {
  return (
    <>
      <InputLabel disabled={props.disabled}>{props.label}</InputLabel>
      <Select
        {...props}
        label={undefined}
        displayEmpty
        renderValue={value => {
          const item = IDENTITY_OPTS.find(({ value: v }) => v === value)
          return item?.label
        }}
      >
        <SelectItem disabled value={undefined}>
          Identity Type
        </SelectItem>
        {renderSelectItems(IDENTITY_OPTS)}
      </Select>
    </>
  )
}
ProofOfIdentityTypeSelect.displayName = 'Select_ProofOfIdentityTypeSelect'
