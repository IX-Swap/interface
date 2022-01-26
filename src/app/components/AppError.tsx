import React from 'react'
import { Container, Grid, Typography, Alert, AlertTitle } from '@mui/material'
import { FallbackProps } from 'react-error-boundary'

export const AppError = (_props: FallbackProps) => {
  return (
    <Container>
      <Grid container direction='column'>
        <Grid item>
          <Alert severity='error'>
            <AlertTitle>Sorry, an error has occurred!</AlertTitle>
            <Typography>
              We will have our engineering team deal with it, hang in there.
            </Typography>
            <Typography>In the meantime try to reload the page.</Typography>
          </Alert>
        </Grid>
      </Grid>
    </Container>
  )
}
