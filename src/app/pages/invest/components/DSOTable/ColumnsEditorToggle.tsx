import React from 'react'
import { ToggleButton } from '@mui/material'
import { ToggleButtonProps } from '@mui/lab'

export interface ColumnsEditorToggleProps extends ToggleButtonProps {}

export const ColumnsEditorToggle = (props: ColumnsEditorToggleProps) => {
  return (
    <ToggleButton
      {...props}
      value='show-table-columns'
      size='large'
      style={{
        width: '100%',
        fontSize: 15,
        fontWeight: 'normal'
      }}
    >
      Manage Columns
    </ToggleButton>
  )
}
