import React from 'react'
import { CorporateIdentity } from 'types/identity'
import { Box, Grid } from '@material-ui/core'
import { AddressFields } from 'app/pages/identity/components/AddressFields'
import { Section } from 'app/pages/identity/components/Section'
import { DeclarationFields } from 'app/pages/identity/components/DeclarationFields'
import { CompanyInfoFields } from 'app/pages/identity/components/CompanyInfoFields'
import { CorporateIdentityFormValues } from 'app/pages/identity/components/types'
import { CorporateProfilesFields } from 'app/pages/identity/components/CorporateProfilesFields'
import { getIdentityFormDefaultValue } from 'app/pages/identity/utils'
import { Form } from 'components/form/Form'
import { Submit } from 'components/form/Submit'
import { IdentityDataroom } from 'app/pages/identity/components/IdentityDataroom'
import { corporateIdentityFormValidationSchema } from 'validation/identities'

export interface CorporateIdentityFormProps {
  data: CorporateIdentity | undefined
  onSubmit?: (values: CorporateIdentityFormValues) => void
  submitButtonText?: string
  cancelButton?: JSX.Element
}

export const CorporateIdentityForm = (
  props: CorporateIdentityFormProps
): JSX.Element => {
  const { data, submitButtonText, cancelButton, onSubmit } = props
  const handleSubmit = (values: CorporateIdentityFormValues) => {
    if (onSubmit !== undefined) {
      onSubmit(values)
    }
  }

  return (
    <Form
      defaultValues={getIdentityFormDefaultValue(data, 'corporate')}
      validationSchema={corporateIdentityFormValidationSchema}
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Section title='Company Information'>
            <CompanyInfoFields />
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section title='Company Address'>
            <AddressFields rootName='companyAddress' />
          </Section>
        </Grid>
        <CorporateProfilesFields
          title='Company Authorized Personnel'
          type='representatives'
        />
        <CorporateProfilesFields title='Company Director' type='directors' />
        <CorporateProfilesFields
          title='Beneficial Owner'
          type='beneficialOwners'
        />
        <Grid item xs={12}>
          <Section title='Documents'>
            <IdentityDataroom />
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section title='Declaration'>
            <DeclarationFields type='corporate' />
          </Section>
        </Grid>

        <Grid container justify='center' item xs={12}>
          {cancelButton}
          <Box px={1} />
          <Submit>{submitButtonText}</Submit>
        </Grid>
      </Grid>
    </Form>
  )
}
