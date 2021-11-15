import React from 'react'
import { Divider, Grid } from '@material-ui/core'
import { useBannersList } from 'app/pages/admin/hooks/useBannersList'
import { BannerTable } from 'app/pages/admin/components/BannerTable'

export const BannerList = () => {
  const { data: banners, isLoading } = useBannersList()

  if (isLoading || banners === undefined) {
    return null
  }

  return (
    <Grid item>
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <Divider style={{ backgroundColor: '#141272' }} />
          <BannerTable banners={banners} />
        </Grid>
      </Grid>
    </Grid>
  )
}
