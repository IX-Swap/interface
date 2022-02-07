import React from 'react'
import { Grid } from '@mui/material'
import { SearchFilter } from 'app/components/SearchFilter'
import { useStyles } from './CustodySearchFilter.styles'

export const CustodySearchFilter = () => {
  const classes = useStyles()

  return (
    <Grid item md={5} xs={12} className={classes.wrapper}>
      <SearchFilter
        fullWidth
        placeholder='Search'
        inputAdornmentPosition='start'
      />
    </Grid>
  )
}
