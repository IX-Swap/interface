import React from 'react'
import { Status } from 'app/pages/admin/components/Status'
import { useStyles } from 'app/pages/identity/components/IndividualPreview/PreviewHeader.styles'
import { Box, Grid, Typography } from '@material-ui/core'

export interface PreviewHeaderProps {
  title: string
  status: string
}

export const PreviewHeader = ({ title, status }: PreviewHeaderProps) => {
  const classes = useStyles()
  return (
    <Box className={classes.previewHeader}>
      <Grid container justifyContent='space-between' alignContent='center'>
        <Grid item>
          <Typography variant='h5'>{title}</Typography>
        </Grid>
        <Grid item>
          <Status
            status={status}
            variant={status === 'Approved' ? 'success' : 'draft'}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
