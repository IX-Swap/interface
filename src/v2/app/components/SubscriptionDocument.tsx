import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { AuthorizationDocument } from 'v2/app/pages/authorizer/components/AuthorizationDocument'
import { DataroomFile } from 'v2/types/dataroomFile'

export interface SubscriptionDocumentProps {
  document: DataroomFile
}

export const SubscriptionDocument = (props: SubscriptionDocumentProps) => {
  return (
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <Typography variant='h3'>Subscription Document</Typography>
      </Grid>

      <Grid item>
        <AuthorizationDocument value={props.document} />
      </Grid>
    </Grid>
  )
}
