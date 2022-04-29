import { Paper } from '@mui/material'
import React from 'react'

export const FieldContainer: React.FunctionComponent<{}> = ({ children }) => {
  return <Paper sx={{ borderRadius: 2, p: 5 }}>{children}</Paper>
}
