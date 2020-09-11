import React from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { renderMenu } from 'v2/helpers/rendering'
import { GENDERS_OPTS } from 'v2/app/pages/identity/const'

export const GenderSelect = (props: any): JSX.Element => {
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Gender
      </MenuItem>
      {renderMenu(GENDERS_OPTS)}
    </Select>
  )
}
