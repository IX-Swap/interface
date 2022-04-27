import React from 'react'
import { Box, Grid } from '@mui/material'
import { AccessReports as AccessReportsTable } from 'app/pages/educationCentre/components/AccessReports'
import { UploadAccessReport } from 'app/pages/admin/components/UploadAccessReport'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { privateClassNames } from 'helpers/classnames'

export const AccessReports = () => {
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item xs={12}>
        <PageHeader title='Access Reports' />
      </Grid>
      <RootContainer className={privateClassNames()}>
        <Grid item xs={12} container justifyContent='flex-end'>
          <Box>
            <UploadAccessReport />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <AccessReportsTable editable />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
