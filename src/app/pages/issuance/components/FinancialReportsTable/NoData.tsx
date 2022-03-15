import React from 'react'
import { ReactComponent as NoDataImage } from 'assets/icons/empty-box.svg'
import { Box, Button, Grid, Typography } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'

export const NoData = () => {
  const { data, isLoading } = useDSOsByUserId('Approved', true)
  const noDSO = data === undefined || data.list.length < 1

  if (isLoading) {
    return null
  }

  return (
    <Grid container>
      <Grid item xs={12} container justifyContent='center' alignItems='center'>
        <Box pt={8} pb={2}>
          <NoDataImage />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box pb={8} height='100%' display='flex'>
          <Grid container alignItems='center'>
            <Grid item xs={12}>
              <Typography variant='body1'>
                There is no reports at the moment.
                {noDSO && ' To create a report it is necessary to have a DSO'}
              </Typography>
            </Grid>
            {noDSO && (
              <Grid item xs={12}>
                <Button
                  component={AppRouterLinkComponent}
                  to={IssuanceRoute.create}
                  color='primary'
                >
                  Create your first DSO
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
