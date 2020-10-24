import React, { Suspense } from 'react'
import { IndividualIdentity } from 'v2/types/identity'
import { Box, Grid } from '@material-ui/core'
import { Section } from 'v2/app/pages/identity/components/Section'
import { createTypedForm } from 'v2/components/form/createTypedForm'
import { IndividualIdentityFormValues } from 'v2/app/pages/identity/components/types'
import { individualIdentityFormValidationSchema } from 'v2/app/pages/identity/components/validation'
import { useCreateOrUpdateIndividual } from 'v2/hooks/identity/useCreateOrUpdateIndividual'
import { getIdentityFormDefaultValue } from 'v2/app/pages/identity/utils'
import { Submit } from 'v2/components/form/Submit'
import { declarations } from 'v2/app/pages/identity/const/declarations'
import { PersonalInfoFields } from 'v2/app/pages/identity/components/PersonalInfoFields'
import { AddressFields } from 'v2/app/pages/identity/components/AddressFields'
import { FinancialFields } from 'v2/app/pages/identity/components/FinancialFields'
import { IdentityDataroom } from 'v2/app/pages/identity/components/IdentityDataroom'
import { Declarations } from 'v2/app/pages/identity/components/Declarations'
import { Form } from 'v2/components/form/Form'

export const useIndividualIdentityForm = createTypedForm<
  IndividualIdentityFormValues
>()

export interface IndividualIdentityFormProps {
  data: IndividualIdentity | undefined
  isNew?: boolean
  submitButtonText?: string
  cancelButton?: JSX.Element
}

export const IndividualIdentityForm = (
  props: IndividualIdentityFormProps
): JSX.Element => {
  const { data, submitButtonText, cancelButton } = props
  const [createOrUpdateIndividual] = useCreateOrUpdateIndividual()
  const handleSubmit = async (values: IndividualIdentityFormValues) => {
    await createOrUpdateIndividual(values)
  }

  return (
    <Form
      defaultValues={getIdentityFormDefaultValue(data, 'individual')}
      validationSchema={individualIdentityFormValidationSchema}
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Section title='Identity'>
            <PersonalInfoFields />
          </Section>
        </Grid>

        <Suspense fallback={'loading...'}>
          <Grid item xs={12}>
            <Section title='Address'>
              <AddressFields />
            </Section>
          </Grid>
        </Suspense>

        <Suspense fallback={'loading...'}>
          <Grid item xs={12}>
            <Section title='Financials'>
              <FinancialFields />
            </Section>
          </Grid>
        </Suspense>

        <Suspense fallback={'loading...'}>
          <Grid item xs={12}>
            <Section title='Documents'>
              <IdentityDataroom />
            </Section>
          </Grid>
        </Suspense>

        <Grid item xs={12}>
          <Section title='Declaration & Acknowledgement'>
            <Suspense fallback={'loading...'}>
              <Declarations declarations={declarations.individual} />
            </Suspense>
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
