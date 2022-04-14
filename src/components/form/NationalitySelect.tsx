import React from 'react'
// import { MenuItem, Select } from '@mui/material'
import { renderSelectItems } from 'helpers/rendering'
import { NATIONALITIES_OPTS } from 'app/pages/identity/const'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const NationalitySelect = (props: any): JSX.Element => {
  return (
    <Select {...props}>
      <SelectItem disabled value={undefined}>
        Nationality
      </SelectItem>
      {renderSelectItems(NATIONALITIES_OPTS)}
    </Select>
  )
}
