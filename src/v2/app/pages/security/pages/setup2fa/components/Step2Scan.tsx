import React, { useEffect } from 'react'
import { Container, Typography, Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import { useSetup2fa } from '../hooks/useSetup2fa'
import { useSetup2faStore } from '../context'
import { useObserver } from 'mobx-react'

const useStyles = makeStyles(() => ({
  image: {
    height: '150px',
    width: '150px',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    marginRight: '1em'
  },
  label: {
    color: grey[500],
    fontSize: '.95em'
  },
  key: {
    color: grey[700],
    paddingTop: '1em'
  }
}))

export const Step2Scan = () => {
  const classes = useStyles()
  const store = useSetup2faStore()
  const [fn] = useSetup2fa()

  useEffect(() => {
    const fetch = async () => {
      await fn()
    }

    void fetch()
    // eslint-disable-next-line
  }, [])

  return useObserver(() => (
    <Container>
      <Typography align='center'>
        Scan this QR Code in the Google Authenticator App
      </Typography>

      <Grid container justify='center'>
        <Box width='60%' pt={3}>
          <Grid container justify='center' alignItems='center'>
            <Grid item>
              <div
                className={classes.image}
                style={{ backgroundImage: `url('${store.image}')` }}
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
    </Container>
  ))
}
