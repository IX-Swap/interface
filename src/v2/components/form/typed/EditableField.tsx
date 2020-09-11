import React, { PropsWithChildren } from 'react'
import { Grid, Typography } from '@material-ui/core'

export interface EditableFieldProps {
  isEditMode: boolean
}

export const EditableField = (
  props: PropsWithChildren<EditableFieldProps>
): any => {
  const { isEditMode, children } = props

  if (isEditMode) {
    return children
  }

  return (
    <Grid item>
      <Typography>Label</Typography>
      <Typography>Value</Typography>
    </Grid>
  )
}
