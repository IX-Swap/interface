import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { CreateIndividual } from 'app/pages/_identity/pages/CreateIndividual'

export const IndividualIdCreate: React.FC = () => {
  return (
    <Grid container>
      <Grid container item xs={12}>
        <VSpacer size='medium' />
      </Grid>
      <Grid item xs={12}>
        <CreateIndividual />
      </Grid>
    </Grid>
  )
}
