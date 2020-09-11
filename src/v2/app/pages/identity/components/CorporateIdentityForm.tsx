import React from 'react'
import { CorporateIdentity } from 'v2/types/identity'
import { Grid } from '@material-ui/core'
import { Address } from 'v2/app/pages/identity/components/Address'
import { Section } from 'v2/app/pages/identity/components/Section'
import { Declaration } from 'v2/app/pages/identity/components/Declaration'
import UserInfoComponent from 'v2/app/pages/identity/components/UserInfo'
import { Dataroom } from 'v2/app/pages/identity/components/dataroom/Dataroom'
import declarations, {
  formatDeclarations
} from 'v2/app/pages/identity/const/declarations'
import documents from 'v2/app/pages/identity/const/documents'
import { CompanyInformation } from 'v2/app/pages/identity/components/CompanyInfo'
import { createTypedForm } from 'v2/components/form/typed/createTypedForm'
import { CorporateIdentityFormValues } from 'v2/app/pages/identity/components/types'
import { corporateIdentityFormValidationSchema } from 'v2/app/pages/identity/components/validation'

export const useCorporateIdentityForm = createTypedForm<
  CorporateIdentityFormValues
>()

export interface CorporateIdentityFormProps {
  identity: CorporateIdentity
  editMode: boolean
  useOwnEmail: boolean
}

export const CorporateIdentityForm = (
  props: CorporateIdentityFormProps
): JSX.Element => {
  const { identity, editMode, useOwnEmail } = props
  const { Form } = useCorporateIdentityForm()

  return (
    <Form
      defaultValues={identity}
      validationSchema={corporateIdentityFormValidationSchema}
      onSubmit={alert}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Section title='Company Information'>
            <CompanyInformation
              corporate={identity}
              useOwnEmail={useOwnEmail}
              isEditing={editMode}
            />
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section title='Company Address'>
            <Address isEditing={editMode} />
          </Section>
        </Grid>
        {identity.representatives.map((e, i) => (
          <Grid item xs={12} key={e.email ?? 'email'}>
            {/* <IdentitySection */}
            {/*  title='Company Representative' */}
            {/*  onAdd={ */}
            {/*    editMode && i === identity.representatives.length - 1 */}
            {/*      ? onAdd */}
            {/*      : undefined */}
            {/*  } */}
            {/*  onDelete={ */}
            {/*    editMode */}
            {/*      ? async () => await onDelete(identity.representatives, i) */}
            {/*      : undefined */}
            {/*  } */}
            {/* > */}
            <Section title='Company Representative'>
              <UserInfoComponent
                identity={e}
                useOwnEmail={false}
                isEditing={editMode}
              />
            </Section>
          </Grid>
        ))}
        {identity.directors.map((e, i) => (
          <Grid item xs={12} key={e.email ?? 'email'}>
            {/* <IdentitySection */}
            {/*  title='Company Director' */}
            {/*  onAdd={ */}
            {/*    editMode && i === identity.directors.length - 1 */}
            {/*      ? onAdd */}
            {/*      : undefined */}
            {/*  } */}
            {/*  onDelete={ */}
            {/*    editMode */}
            {/*      ? async () => await onDelete(identity.directors, i) */}
            {/*      : undefined */}
            {/*  } */}
            {/* > */}
            <Section title='Company Director'>
              <UserInfoComponent
                identity={e}
                useOwnEmail={false}
                isEditing={editMode}
              />
            </Section>
          </Grid>
        ))}
        {identity.beneficialOwners.map((e, i) => (
          <Grid item xs={12} key={e.email ?? 'email'}>
            {/* <IdentitySection */}
            {/*  title='Beneficial Owner' */}
            {/*  onAdd={ */}
            {/*    editMode && i === identity.beneficialOwners.length - 1 */}
            {/*      ? onAdd */}
            {/*      : undefined */}
            {/*  } */}
            {/*  onDelete={ */}
            {/*    editMode */}
            {/*      ? async () => await onDelete(identity.beneficialOwners, i) */}
            {/*      : undefined */}
            {/*  } */}
            {/* > */}
            <Section title='Beneficial Owner'>
              <UserInfoComponent
                identity={e}
                useOwnEmail={false}
                isEditing={editMode}
              />
            </Section>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Section title='Documents'>
            <Dataroom
              documentsList={documents.corporate}
              dataroom={identity.documents ?? []}
              editMode={editMode}
            />
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section
            title='Declaration & Acknowledgement'
            subtitle='Confirmation'
          >
            <Declaration
              isEditing={editMode}
              declarations={formatDeclarations(
                identity.declarations || declarations.corporate,
                'corporate'
              )}
            />
          </Section>
        </Grid>
      </Grid>
    </Form>
  )
}
