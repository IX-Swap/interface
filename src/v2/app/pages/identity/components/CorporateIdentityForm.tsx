import React from 'react'
import { CorporateIdentity } from 'v2/types/identity'
import { Box, Grid } from '@material-ui/core'
import { AddressFields } from 'v2/app/pages/identity/components/AddressFields'
import { Section } from 'v2/app/pages/identity/components/Section'
import { Declarations } from 'v2/app/pages/identity/components/Declarations'
import { Dataroom } from 'v2/app/pages/identity/components/dataroom/Dataroom'
import { CompanyInfo } from 'v2/app/pages/identity/components/CompanyInfo'
import { createTypedForm } from 'v2/components/form/createTypedForm'
import { CorporateIdentityFormValues } from 'v2/app/pages/identity/components/types'
import { corporateIdentityFormValidationSchema } from 'v2/app/pages/identity/components/validation'
import { CorporateProfiles } from 'v2/app/pages/identity/components/CorporateIdProfiles'
import {
  getIdentityDeclarations,
  getIdentityFormDefaultValue
} from 'v2/app/pages/identity/utils'
import { Form } from 'v2/components/form/Form'
import { Submit } from 'v2/components/form/Submit'
import { IdentityDataroom } from 'v2/app/pages/identity/components/IdentityDataroom'
import { declarations } from 'v2/app/pages/identity/const/declarations'

export interface CorporateIdentityFormProps {
  data: CorporateIdentity | undefined
  isEditing: boolean
  useOwnEmail: boolean
  onSubmit?: (values: CorporateIdentityFormValues) => void
  submitButtonText?: string
  cancelButton?: JSX.Element
}

export const CorporateIdentityForm = (
  props: CorporateIdentityFormProps
): JSX.Element => {
  const {
    data,
    isEditing,
    useOwnEmail,
    submitButtonText,
    cancelButton,
    onSubmit
  } = props
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
            <CompanyInfo />
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section title='Company Address'>
            <AddressFields rootName='companyAddress' />
          </Section>
        </Grid>
        <CorporateProfiles
          title='Company Representative'
          type='representatives'
          isEditing={isEditing}
        />
        <CorporateProfiles
          title='Company Director'
          type='directors'
          isEditing={isEditing}
        />
        <CorporateProfiles
          title='Beneficial Owner'
          type='beneficialOwners'
          isEditing={isEditing}
        />
        <Grid item xs={12}>
          <Section title='Documents'>
            <IdentityDataroom />
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section
            title='Declaration & Acknowledgement'
            subtitle='Confirmation'
          >
            <Declarations declarations={declarations.corporate} />
          </Section>
        </Grid>
        {isEditing && (
          <Grid container justify='center' item xs={12}>
            {cancelButton}
            <Box px={1} />
            <Submit>{submitButtonText}</Submit>
          </Grid>
        )}
      </Grid>
    </Form>
  )
}
