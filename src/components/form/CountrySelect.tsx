import React from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { renderMenuItems } from 'helpers/rendering'
import { COUNTRIES_OPTS } from 'app/pages/identity/const'

export const CountrySelect = (props: any): JSX.Element => {
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Country
      </MenuItem>
      {renderMenuItems(COUNTRIES_OPTS)}
    </Select>
  )
}
