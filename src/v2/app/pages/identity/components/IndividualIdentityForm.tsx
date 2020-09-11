import React, { Suspense } from 'react'
import { IndividualIdentity } from 'v2/types/identity'
import UserInfoComponent from 'v2/app/pages/identity/components/UserInfo'
import { Box, Grid } from '@material-ui/core'
import { Section } from 'v2/app/pages/identity/components/Section'
import documents from 'v2/app/pages/identity/const/documents'
import { createTypedForm } from 'v2/components/form/typed/createTypedForm'
import { IndividualIdentityFormValues } from 'v2/app/pages/identity/components/types'
import { individualIdentityFormValidationSchema } from 'v2/app/pages/identity/components/validation'
import { useCreateOrUpdateIndividualMutation } from 'v2/hooks/identity/useCreateOrUpdateIndividualMutation'
import { useAuth } from 'v2/hooks/auth/useAuth'
import {
  getIdentityDeclarations,
  getIdentityDocuments
} from 'v2/app/pages/identity/utils'
import declarations from 'v2/app/pages/identity/const/declarations'

const Declaration = React.lazy(
  async () =>
    await import(
      'v2/app/pages/identity/components/Declaration'
    ).then(module => ({ default: module.Declaration }))
)
const Address = React.lazy(
  async () =>
    await import('v2/app/pages/identity/components/Address').then(module => ({
      default: module.Address
    }))
)
const Financials = React.lazy(
  async () =>
    await import(
      'v2/app/pages/identity/components/Financials'
    ).then(module => ({ default: module.Financials }))
)
const Dataroom = React.lazy(
  async () =>
    await import(
      'v2/app/pages/identity/components/dataroom/Dataroom'
    ).then(module => ({ default: module.Dataroom }))
)

export const useIndividualIdentityForm = createTypedForm<
  IndividualIdentityFormValues
>()

interface IndividualIdentityFormProps {
  identity: IndividualIdentity | undefined
  isEditing: boolean
  useOwnEmail: boolean
  submitButtonText?: string
  cancelButton?: JSX.Element
}

export const IndividualIdentityForm = (
  props: IndividualIdentityFormProps
): JSX.Element => {
  const {
    identity,
    isEditing,
    useOwnEmail,
    submitButtonText,
    cancelButton
  } = props
  const { Form, Submit } = useIndividualIdentityForm()
  const [createOrUpdateIndividual] = useCreateOrUpdateIndividualMutation()
  const { user } = useAuth()
  const handleSubmit = async (values: IndividualIdentityFormValues) => {
    if (user === undefined) {
      throw new Error('No user found')
    }

    await createOrUpdateIndividual({ userId: user._id, ...values })
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validationSchema={individualIdentityFormValidationSchema}
      defaultValues={
        identity !== undefined
          ? identity
          : ({ declarations: declarations.individual } as any) // TODO: fix any
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Section title='Identity'>
            <UserInfoComponent
              identity={identity}
              useOwnEmail={useOwnEmail}
              isEditing={isEditing}
            />
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section title='Address'>
            <Suspense fallback={'loading...'}>
              <Address isEditing={isEditing} />
            </Suspense>
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section title='Financials'>
            <Suspense fallback={'loading...'}>
              <Financials isEditing={isEditing} />
            </Suspense>
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section title='Documents'>
            <Suspense fallback={'loading...'}>
              <Dataroom
                documentsList={documents.individual}
                dataroom={getIdentityDocuments(identity)}
                editMode={isEditing}
              />
            </Suspense>
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section title='Declaration & Acknowledgement'>
            <Suspense fallback={'loading...'}>
              <Declaration
                isEditing={isEditing}
                declarations={getIdentityDeclarations(identity)}
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
        <Grid item>
          <Box my={10} />
        </Grid>
      </Grid>
    </Form>
  )
}
