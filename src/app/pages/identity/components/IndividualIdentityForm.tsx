import React from 'react'
import { IndividualIdentity } from 'types/identity'
import { Box, Grid } from '@material-ui/core'
import { Section } from 'app/pages/identity/components/Section'
import { IndividualIdentityFormValues } from 'app/pages/identity/components/types'
import { useCreateOrUpdateIndividual } from 'hooks/identity/useCreateOrUpdateIndividual'
import { getIdentityFormDefaultValue } from 'app/pages/identity/utils'
import { Submit } from 'components/form/Submit'
import { IndividualInfoFields } from 'app/pages/identity/components/IndividualInfoFields'
import { AddressFields } from 'app/pages/identity/components/AddressFields'
import { FinancialFields } from 'app/pages/identity/components/FinancialFields'
import { IdentityDataroom } from 'app/pages/identity/components/IdentityDataroom'
import { DeclarationFields } from 'app/pages/identity/components/DeclarationFields'
import { Form } from 'components/form/Form'
import { individualIdentityFormValidationSchema } from 'validation/identities'

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
            <IndividualInfoFields />
          </Section>
        </Grid>

        <Grid item xs={12}>
          <Section title='Address'>
            <AddressFields />
          </Section>
        </Grid>

        <Grid item xs={12}>
          <Section title='Financials'>
            <FinancialFields />
          </Section>
        </Grid>

        <Grid item xs={12}>
          <Section title='Documents'>
            <IdentityDataroom />
          </Section>
        </Grid>

        <Grid item xs={12}>
          <Section title='Declaration'>
            <DeclarationFields type='individual' />
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
