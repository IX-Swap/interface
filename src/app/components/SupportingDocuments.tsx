import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { DataroomFile } from 'types/dataroomFile'
import { AuthorizationDocument } from 'app/pages/authorizer/components/AuthorizationDocument'

export interface SupportingDocumentsProps {
  data: DataroomFile[]
}

export const SupportingDocuments = (props: SupportingDocumentsProps) => {
  const { data } = props

  return (
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <Typography variant='h3'>Supporting Documents</Typography>
      </Grid>
      <Grid item container wrap='wrap'>
        {data.map(file => (
          <AuthorizationDocument value={file} />
        ))}
      </Grid>
    </Grid>
  )
}
