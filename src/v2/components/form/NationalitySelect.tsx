import React from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { renderMenu } from 'v2/helpers/rendering'
import { NATIONALITIES_OPTS } from 'v2/app/pages/identity/const'

export const NationalitySelect = (props: any): JSX.Element => {
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Nationality
      </MenuItem>
      {renderMenu(NATIONALITIES_OPTS)}
    </Select>
  )
}
