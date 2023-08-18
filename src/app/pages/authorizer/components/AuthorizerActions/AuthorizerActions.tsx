import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Form } from 'components/form/Form'
import { AuthorizationDocuments } from 'app/pages/authorizer/components/AuthorizationDocuments'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'

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
  console.log(id, feature, 'jkjkjkjkk')
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
            <Grid item xs={12}>
              <UploadDocumentField
                name='reportDocuments'
                // isDefaultEmpty
              />
            </Grid>
            {/* <AuthorizationDocuments resourceId={id} feature={feature} /> */}
          </Form>
        </Grid>
      </Grid>
    </Grid>
  )
}
