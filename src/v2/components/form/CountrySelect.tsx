import React from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { renderMenu } from 'v2/helpers/rendering'
import { COUNTRIES_OPTS } from 'v2/app/pages/identity/const'

export const CountrySelect = (props: any): JSX.Element => {
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Country
      </MenuItem>
      {renderMenu(COUNTRIES_OPTS)}
    </Select>
  )
}
