import { Grid } from '@mui/material'
import React from 'react'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
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
    <Grid container direction='column' spacing={3} sx={{ paddingLeft: '25px' }}>
      <FieldContainer>
        <Grid item container direction={'column'} spacing={5}>
          <Grid item>
            <FormSectionHeader title={'Authorization Documents'} />
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
      </FieldContainer>
    </Grid>
  )
}
