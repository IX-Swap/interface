import React from 'react'
import { Grid, Typography } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { BannerForm } from 'app/pages/admin/components/BannerForm'
import { RootContainer } from 'ui/RootContainer'

export const Banner = () => {
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item xs={12}>
        <PageHeader title='Upload Banner' />
      </Grid>
      <RootContainer>
        <Grid item xs={12}>
          <Typography variant={'subtitle2'}>
            Please upload the image file with the dimension{' '}
            <b>1230 x 240 px.</b>
          </Typography>
        </Grid>
        <BannerForm />
      </RootContainer>
    </Grid>
  )
}
