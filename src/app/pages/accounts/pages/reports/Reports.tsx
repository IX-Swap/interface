import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { VSpacer } from 'components/VSpacer'
import { Filters } from './components/Filters/Filters'
import { ReportsTable } from 'app/pages/accounts/pages/reports/components/ReportsTable/ReportsTable'

export const Reports: React.FC = () => {
  return (
    <Grid container direction={'column'}>
      <Grid item>
        <PageHeader title='Reports' />
      </Grid>
      <Grid item>
        <VSpacer size={'small'} />
        <Typography variant={'h4'}>Statements</Typography>
        <VSpacer size={'small'} />
      </Grid>
      <Grid item container justify={'space-between'} alignItems={'center'}>
        <Grid item>
          <Box marginRight={2} marginTop={2} marginBottom={2}>
            <Typography variant={'body1'}>
              View, manage and track your accounting reports and taxations.
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Filters />
        </Grid>
      </Grid>
      <Grid item>
        <VSpacer size={'medium'} />
        <ReportsTable />
      </Grid>
    </Grid>
  )
}
