import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './Actions.styles'

export interface ActionsProps {
  onExpandClick: () => void
  onContractClick: () => void
}

export const Actions = ({ onContractClick, onExpandClick }: ActionsProps) => {
  const classes = useStyles()

  return (
    <Box display={'flex'}>
      <Typography className={classes.link} onClick={onExpandClick}>
        Expand All
      </Typography>
      <Box className={classes.line}>|</Box>
      <Typography className={classes.link} onClick={onContractClick}>
        Contract All
      </Typography>
    </Box>
  )
}
