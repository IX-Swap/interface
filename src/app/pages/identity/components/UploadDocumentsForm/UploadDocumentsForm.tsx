import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Form } from 'components/form/Form'
import { getIdentityFormDefaultValue } from 'app/pages/identity/utils'

export interface UploadDocumentsFormProps {
  identityType: 'individual' | 'corporate'
  children: React.ReactNode
}

export const UploadDocumentsForm = ({
  children,
  identityType
}: UploadDocumentsFormProps) => {
  return (
    <Form defaultValues={getIdentityFormDefaultValue(undefined, identityType)}>
      <Grid container spacing={6} direction='column'>
        <Grid item>
          <Typography>
            Please upload the following documents. All account statements and
            documents should be date within 3 months.
          </Typography>
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
    </Form>
  )
}
