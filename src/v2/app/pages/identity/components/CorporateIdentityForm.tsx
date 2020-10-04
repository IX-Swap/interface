import React from 'react'
import { CorporateIdentity } from 'v2/types/identity'
import { Box, Grid } from '@material-ui/core'
import { Address } from 'v2/app/pages/identity/components/Address'
import { Section } from 'v2/app/pages/identity/components/Section'
import { Declaration } from 'v2/app/pages/identity/components/Declaration'
import { Dataroom } from 'v2/app/pages/identity/components/dataroom/Dataroom'
import { CompanyInformation } from 'v2/app/pages/identity/components/CompanyInfo'
import { createTypedForm } from 'v2/components/form/createTypedForm'
import { CorporateIdentityFormValues } from 'v2/app/pages/identity/components/types'
import { corporateIdentityFormValidationSchema } from 'v2/app/pages/identity/components/validation'
import { CorporateProfiles } from 'v2/app/pages/identity/components/CorporateIdProfiles'
import {
  getIdentityDeclarations,
  getIdentityFormDefaultValue
} from 'v2/app/pages/identity/utils'

export const useCorporateIdentityForm = createTypedForm<
  CorporateIdentityFormValues
>()

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
  const { Form, Submit } = useCorporateIdentityForm()
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
            <CompanyInformation
              corporate={data}
              useOwnEmail={useOwnEmail}
              isEditing={isEditing}
            />
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section title='Company Address'>
            <Address isEditing={isEditing} rootPath='companyAddress' />
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
            <Dataroom isEditing={isEditing} />
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section
            title='Declaration & Acknowledgement'
            subtitle='Confirmation'
          >
            <Declaration
              isEditing={isEditing}
              declarations={getIdentityDeclarations(data, 'corporate')}
            />
          </Section>
        </Grid>
        {isEditing && (
          <Grid container justify='center' item xs={12}>
            {cancelButton}
            <Box px={1} />
            <Submit>{submitButtonText}</Submit>
          </Grid>
        )}
        <Grid item>
          <Box my={10} />
        </Grid>
      </Grid>
    </Form>
  )
}
