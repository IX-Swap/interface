import { Box, Button, Grid, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { useReportTemplate } from 'app/pages/issuance/hooks/useReportTemplate'
import React from 'react'

export const DownloadTemplate = () => {
  const { templateUrl, isLoading } = useReportTemplate()
  return (
    <Box px={4} py={3} bgcolor={grey[100]} borderRadius={6}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>Download Template</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>
            Please download the financial report template from below and upload
            it once you fill up the details. If you already have reports then
            upload it either in CSV or PDF format.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='outlined'
            disabled={isLoading || templateUrl === undefined}
            href={templateUrl}
            color='primary'
          >
            Download
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
