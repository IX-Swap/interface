import React from 'react'
import { MenuItem, Select } from '@mui/material'
import { renderMenuItems } from 'helpers/rendering'
import { FUNDSOURCES_OPTS } from 'app/pages/identity/const'

export const FundSourceSelect = (props: any): JSX.Element => {
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Source of fund
      </MenuItem>
      {renderMenuItems(FUNDSOURCES_OPTS)}
    </Select>
  )
}
