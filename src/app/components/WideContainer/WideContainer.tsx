import { Box } from '@mui/material'
import React from 'react'
import { useStyles } from 'app/components/WideContainer/WideContainer.styles'

export const WideContainer: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Box className={classes.wrapper}>{children}</Box>
    </Box>
  )
}
