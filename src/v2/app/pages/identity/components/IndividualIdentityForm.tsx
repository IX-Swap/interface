import React, { Suspense } from 'react'
import { IndividualIdentity } from 'v2/types/identity'
import UserInfoComponent from 'v2/app/pages/identity/components/UserInfo'
import { Box, Grid } from '@material-ui/core'
import { Section } from 'v2/app/pages/identity/components/Section'
import { createTypedForm } from 'v2/components/form/createTypedForm'
import { IndividualIdentityFormValues } from 'v2/app/pages/identity/components/types'
import { individualIdentityFormValidationSchema } from 'v2/app/pages/identity/components/validation'
import { useCreateOrUpdateIndividual } from 'v2/hooks/identity/useCreateOrUpdateIndividual'
import {
  getIdentityDeclarations,
  getIdentityFormDefaultValue
} from 'v2/app/pages/identity/utils'
import { Address } from './Address'
import { Financials } from './Financials'
import { Dataroom } from './dataroom/Dataroom'
import { Declaration } from './Declaration'

export const useIndividualIdentityForm = createTypedForm<
  IndividualIdentityFormValues
>()

export interface IndividualIdentityFormProps {
  data: IndividualIdentity | undefined
  isEditing: boolean
  useOwnEmail: boolean
  submitButtonText?: string
  cancelButton?: JSX.Element
}

export const IndividualIdentityForm = React.memo(
  (props: IndividualIdentityFormProps): JSX.Element => {
    const {
      data,
      isEditing,
      useOwnEmail,
      submitButtonText,
      cancelButton
    } = props
    const { Form, Submit } = useIndividualIdentityForm()
    const [createOrUpdateIndividual] = useCreateOrUpdateIndividual()
    const handleSubmit = async (values: IndividualIdentityFormValues) => {
      await createOrUpdateIndividual(values)
    }

    return (
      <Form
        onSubmit={handleSubmit}
        validationSchema={individualIdentityFormValidationSchema}
        defaultValues={getIdentityFormDefaultValue(data, 'individual')}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Section title='Identity'>
              <UserInfoComponent
                useOwnEmail={useOwnEmail}
                isEditing={isEditing}
              />
            </Section>
          </Grid>
          <Suspense fallback={'loading...'}>
            <Grid item xs={12}>
              <Section title='Address'>
                <Address isEditing={isEditing} />
              </Section>
            </Grid>
          </Suspense>
          <Suspense fallback={'loading...'}>
            <Grid item xs={12}>
              <Section title='Financials'>
                <Financials isEditing={isEditing} />
              </Section>
            </Grid>
          </Suspense>
          <Suspense fallback={'loading...'}>
            <Grid item xs={12}>
              <Section title='Documents'>
                <Dataroom isEditing={isEditing} />
              </Section>
            </Grid>
          </Suspense>
          <Grid item xs={12}>
            <Section title='Declaration & Acknowledgement'>
              <Suspense fallback={'loading...'}>
                <Declaration
                  isEditing={isEditing}
                  declarations={getIdentityDeclarations(data, 'individual')}
                />
              </Suspense>
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
)
