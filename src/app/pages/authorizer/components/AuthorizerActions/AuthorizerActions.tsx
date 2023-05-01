import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Form } from 'components/form/Form'
import { AuthorizationDocuments } from 'app/pages/authorizer/components/AuthorizationDocuments'

interface AuthorizerActionsProps {
  id: string
  feature: any
  documents: any
}

export const AuthorizerActions = ({
  id,
  feature,
  documents
}: AuthorizerActionsProps) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container direction={'column'} spacing={5}>
        <Grid item>
          <Typography>Upload Authorization Documents</Typography>
        </Grid>
        <Grid item>
          <Form
            defaultValues={{
              documents: documents.map(value => ({ value }))
            }}
          >
            <AuthorizationDocuments resourceId={id} feature={feature} />
          </Form>
        </Grid>
      </Grid>
    </Grid>
  )
}
