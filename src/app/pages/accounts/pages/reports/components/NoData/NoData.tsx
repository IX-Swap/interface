import { useStyles } from './NoData.styles'
import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { ReactComponent as NoDataImage } from 'assets/images/no_data.svg'
import { VSpacer } from 'components/VSpacer'

export const NoData = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
      className={classes.wrapper}
    >
      <Grid item>
        <VSpacer size={'large'} />
        <NoDataImage style={{ maxWidth: '100%' }} />
      </Grid>
      <Grid item>
        <VSpacer size={'medium'} />
        <Typography className={classes.subtitle}>
          This page is empty.
        </Typography>
        <Box px={0.5} />
        <Typography className={classes.content}>
          There are no records to display for the selected report.
        </Typography>
        <VSpacer size={'medium'} />
      </Grid>
    </Grid>
  )
}
