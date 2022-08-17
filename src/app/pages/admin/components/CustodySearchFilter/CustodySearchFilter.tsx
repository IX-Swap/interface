import { Grid } from '@mui/material'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import React from 'react'
import { useStyles } from './CustodySearchFilter.styles'

export const CustodySearchFilter = () => {
  const classes = useStyles()

  return (
    <Grid item md={5} xs={12} className={classes.wrapper}>
      <TextInputSearchFilter
        fullWidth
        placeholder='Search'
        inputAdornmentPosition='start'
      />
    </Grid>
  )
}
