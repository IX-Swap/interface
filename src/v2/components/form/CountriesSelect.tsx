import React from 'react'
import { observer } from 'mobx-react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { renderMenu } from 'v2/helpers/rendering'
import { COUNTRIES_OPTS } from 'v2/app/components/identity-forms/const'

export const CountriesSelect = observer((props: SelectProps) => {
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Country
      </MenuItem>
      {renderMenu(COUNTRIES_OPTS)}
    </Select>
  )
})
