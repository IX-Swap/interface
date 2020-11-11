import React from 'react'
import { CorporateIdentity } from 'v2/types/identity'
import { Box, Grid } from '@material-ui/core'
import { AddressFields } from 'v2/app/pages/identity/components/AddressFields'
import { Section } from 'v2/app/pages/identity/components/Section'
import { DeclarationFields } from 'v2/app/pages/identity/components/DeclarationFields'
import { CompanyInfoFields } from 'v2/app/pages/identity/components/CompanyInfoFields'
import { CorporateIdentityFormValues } from 'v2/app/pages/identity/components/types'
import { CorporateProfilesFields } from 'v2/app/pages/identity/components/CorporateProfilesFields'
import { getIdentityFormDefaultValue } from 'v2/app/pages/identity/utils'
import { Form } from 'v2/components/form/Form'
import { Submit } from 'v2/components/form/Submit'
import { IdentityDataroom } from 'v2/app/pages/identity/components/IdentityDataroom'
import { corporateIdentityFormValidationSchema } from 'v2/validation/identities'

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
          title='Company Representative'
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
