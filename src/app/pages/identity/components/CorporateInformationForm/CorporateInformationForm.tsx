import React from 'react'
import { Grid } from '@material-ui/core'
import { Form } from 'components/form/Form'
import { InformationFields } from 'app/pages/identity/components/CorporateInformationForm/InformationFields'
import { CorporateAddressFields } from 'app/pages/identity/components/CorporateInformationForm/CorporateAddressFields'
import { AuthorizedPersonnelFields } from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnelFields'

export const CorporateInformationForm = () => {
  return (
    <Form
      defaultValues={{
        mailingSameAsRegistered: true,
        mailingAddress: {},
        others: '',
        representatives: [
          {
            fullName: '',
            designation: '',
            email: '',
            contactNumber: '',
            documents: []
          }
        ]
      }}
    >
      <Grid container spacing={6} direction='column'>
        <Grid item>
          <InformationFields />
        </Grid>
        <Grid item>
          <CorporateAddressFields />
        </Grid>
        <Grid item>
          <AuthorizedPersonnelFields />
        </Grid>
      </Grid>
    </Form>
  )
}
