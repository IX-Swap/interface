import React from 'react'
import { MenuItem } from '@mui/material'
import { renderMenuItems } from 'helpers/rendering'
import { FUNDSOURCES_OPTS } from 'app/pages/identity/const'
import { Select } from 'ui/Select/Select'

export const FundSourceSelect = (props: any): JSX.Element => {
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Source of funds
      </MenuItem>
      {renderMenuItems(FUNDSOURCES_OPTS)}
    </Select>
  )
}

FundSourceSelect.displayName = 'TextField_FundSourceSelect'
