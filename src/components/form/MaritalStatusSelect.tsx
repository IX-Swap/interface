import React from 'react'
import { renderSelectItems } from 'helpers/rendering'
import { MARITAL_STATUSES_OPTS } from 'app/pages/identity/const'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const MaritalStatusSelect = (props: any): JSX.Element => {
  return (
    <Select {...props}>
      <SelectItem disabled value={undefined}>
        Martial Status
      </SelectItem>
      {renderSelectItems(MARITAL_STATUSES_OPTS)}
    </Select>
  )
}
