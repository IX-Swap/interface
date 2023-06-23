import { Paper } from '@mui/material'
import React from 'react'

export const FieldContainer: React.FunctionComponent<{}> = ({
  children,
  ...rest
}) => {
  return (
    <Paper sx={{ borderRadius: 2, p: { xs: 2.5, md: 5 } }} {...rest}>
      {children}
    </Paper>
  )
}