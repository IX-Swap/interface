import React from 'react'
import { useStyles } from 'app/pages/identity/components/SubmitIdentity/SubmitIdentity.style'
import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { ReactComponent as Success } from 'assets/icons/alerts/success.svg'
// import { ReactComponent as Dot } from 'assets/icons/new/dot.svg'
// import { IdentityRoute } from 'app/pages/identity/router/config'
// import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { TwoFAALert } from 'app/pages/identity/components/SubmitIdentity/TwoFAALert'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const SubmitIdentity = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.boxHeader}>
      <PageHeader title='succes' />
      <Grid item xs={12}>
        <Typography variant='h3'>user name</Typography>
      </Grid>
      <Grid item className={classes.breadcrumbs}>
        <Typography className={classes.breadcrumbsLink}>Profile</Typography>
        <Box className={classes.dot}>''</Box>
        <Typography className={classes.breadcrumbsLink}>Identity</Typography>
      </Grid>
      <Box>
        <Box className={classes.boxAlert} mb={2} height={372}>
          <Grid className={classes.iconSuccess}>
            <Success height={80} width={80} />
          </Grid>
          <Grid className={classes.mainContent}>
            <Typography variant='h2'>
              Thank you for your application!
            </Typography>
            <Typography className={classes.text} mt={2}>
              We are checking your application now, this usually takes from one
              to three days
            </Typography>
            <Typography className={classes.text} mt={2}>
              If you have any further questions, you can always contact our{' '}
              <a href=' https://investax.io/contact/ '>support deprtment</a>
            </Typography>
            <Button variant='outlined' size='large'>
              View Identity
            </Button>
          </Grid>
        </Box>
        <TwoFAALert />
      </Box>
    </Grid>
  )
}
