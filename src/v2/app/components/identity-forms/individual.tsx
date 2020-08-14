import React from 'react'
import { IndividualIdentity } from '../../../types/identity'
import UserInfoComponent from './components/user-info'
import { Grid } from '@material-ui/core'
import AddressForm from './components/address'
import IdentitySection from './components/section'
import Financials from './components/financials'
import Declarations from './components/declaration'
import Dataroom from './components/dataroom'
import declarations, { formatDeclarations } from './const/declarations'
import documents from './const/documents'
import { FormContext, useForm } from 'react-hook-form'

const IndividualIdentityForm = ({
  identity,
  editMode,
  useOwnEmail
}: {
  identity: IndividualIdentity
  editMode: boolean
  useOwnEmail: boolean
}) => {
  const form = useForm()

  return (
    <FormContext {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <IdentitySection title='Identity'>
            <UserInfoComponent
              identity={identity}
              useOwnEmail={useOwnEmail}
              editMode={editMode}
            />
          </IdentitySection>
        </Grid>
        <Grid item xs={12}>
          <IdentitySection title='Address'>
            <AddressForm address={identity.address} editMode={editMode} />
          </IdentitySection>
        </Grid>
        <Grid item xs={12}>
          <IdentitySection title='Financials'>
            <Financials identity={identity} editMode={editMode} />
          </IdentitySection>
        </Grid>
        <Grid item xs={12}>
          <IdentitySection title='Documents'>
            <Dataroom
              documentsList={documents.individual}
              dataroom={identity.documents ?? []}
              editMode={editMode}
            />
          </IdentitySection>
        </Grid>
        <Grid item xs={12}>
          <IdentitySection
            title='Declaration & Acknowledgement'
            subtitle='Confirmation'
          >
            <Declarations
              editMode={editMode}
              declarations={formatDeclarations(
                identity.declarations || declarations.individual,
                'individual'
              )}
            />
          </IdentitySection>
        </Grid>
      </Grid>
    </FormContext>
  )
}

export default IndividualIdentityForm
