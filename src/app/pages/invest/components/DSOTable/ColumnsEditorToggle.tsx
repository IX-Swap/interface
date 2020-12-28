import React from 'react'
import { ToggleButton, ToggleButtonProps } from '@material-ui/lab'

export interface ColumnsEditorToggleProps extends ToggleButtonProps {}

export const ColumnsEditorToggle = (props: ColumnsEditorToggleProps) => {
  return (
    <ToggleButton
      {...props}
      value='show-table-columns'
      style={{ width: '100%' }}
    >
      Columns
    </ToggleButton>
  )
}
