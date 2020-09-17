import React from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { renderMenu } from 'v2/helpers/rendering'
import { MARITAL_STATUSES_OPTS } from 'v2/app/pages/identity/const'

export const MartialStatusSelect = (props: any): JSX.Element => {
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Martial Status
      </MenuItem>
      {renderMenu(MARITAL_STATUSES_OPTS)}
    </Select>
  )
}
