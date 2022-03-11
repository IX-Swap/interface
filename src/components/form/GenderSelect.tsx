import React from 'react'
import { MenuItem, Select } from '@mui/material'
import { renderMenuItems } from 'helpers/rendering'
import { GENDERS_OPTS } from 'app/pages/identity/const'

export const GenderSelect = (props: any): JSX.Element => {
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Gender
      </MenuItem>
      {renderMenuItems(GENDERS_OPTS)}
    </Select>
  )
}
