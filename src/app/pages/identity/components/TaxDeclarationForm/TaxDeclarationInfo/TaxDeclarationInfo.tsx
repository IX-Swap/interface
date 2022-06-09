import React from 'react'
import { Grid, Typography } from '@mui/material'
import { TaxDeclarationInfoDialog } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfo/TaxDeclarationInfoDialog/TaxDeclarationInfoDialog'
import useStyles from './TaxDeclarationInfo.style'

export const TaxDeclarationInfo = () => {
  const classes = useStyles()
  return (
    <Grid
      container
      justifyContent={'space-between'}
      alignItems={'center'}
      className={classes.container}
      flexWrap={'nowrap'}
    >
      <Grid item>
        <Typography>To know why we need your tax information</Typography>
      </Grid>
      <Grid item>
        <TaxDeclarationInfoDialog />
      </Grid>
    </Grid>
  )
}
