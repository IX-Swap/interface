import React from 'react'
import { Submit } from 'components/form/Submit'
import { Grid } from '@material-ui/core'

export const WACreateActions = () => {
  return (
    <Grid item style={{ alignSelf: 'flex-end' }}>
      <Submit color='primary' variant='contained'>
        Submit
      </Submit>
    </Grid>
  )
}
