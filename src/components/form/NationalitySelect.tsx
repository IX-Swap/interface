import React from 'react'
import { MenuItem, Select } from '@mui/material'
import { renderMenuItems } from 'helpers/rendering'
import { NATIONALITIES_OPTS } from 'app/pages/identity/const'

export const NationalitySelect = (props: any): JSX.Element => {
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Nationality
      </MenuItem>
      {renderMenuItems(NATIONALITIES_OPTS)}
    </Select>
  )
}
