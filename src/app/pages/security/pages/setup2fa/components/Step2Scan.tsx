import React from 'react'
import { Container, Typography, Box, Grid } from '@material-ui/core'
import useStyles from './Step2Scan.styles'
import { useSetup2fa } from '../hooks/useSetup2fa'
import { useSetup2faStore } from '../context'
import { useObserver } from 'mobx-react'

export const Step2Scan = () => {
  const classes = useStyles()
  const store = useSetup2faStore()
  const { isLoading } = useSetup2fa()

  return useObserver(() => (
    <Container>
      <Typography align='center'>
        Scan this QR Code in the Google Authenticator App
      </Typography>
      {!isLoading && (
        <Grid container justify='center'>
          <Box pt={3}>
            <Grid container justify='center' alignItems='center'>
              <Grid item>
                <div
                  data-testid='store-image'
                  className={classes.image}
                  style={{
                    backgroundImage: `url('${store.image}')`,
                    marginBottom: 10
                  }}
                />
              </Grid>
              <Grid item>
                <Typography className={classes.label}>
                  If you are unable to scan this QR code, <br />
                  please enter this code manually in the app.
                </Typography>

                <Typography variant='h5' className={classes.key}>
                  {store.key}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      )}
    </Container>
  ))
}
