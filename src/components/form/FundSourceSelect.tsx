import React from 'react'
import { MenuItem } from '@mui/material'
import { renderMenuItems } from 'helpers/rendering'
import { FUNDSOURCES_OPTS } from 'app/pages/identity/const'
import { TextFieldSelect } from 'components/form/TextFieldSelect'

export const FundSourceSelect = (props: any): JSX.Element => {
  return (
    <TextFieldSelect {...props}>
      <MenuItem disabled value={undefined}>
        Source of funds
      </MenuItem>
      {renderMenuItems(FUNDSOURCES_OPTS)}
    </TextFieldSelect>
  )
}
