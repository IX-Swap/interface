import React from 'react'
import { MenuItem, Select } from '@mui/material'
import { renderMenuItems } from 'helpers/rendering'
import { MARITAL_STATUSES_OPTS } from 'app/pages/identity/const'

export const MaritalStatusSelect = (props: any): JSX.Element => {
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Martial Status
      </MenuItem>
      {renderMenuItems(MARITAL_STATUSES_OPTS)}
    </Select>
  )
}
