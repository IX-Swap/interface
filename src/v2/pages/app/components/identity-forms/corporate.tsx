import React from 'react'
import { CorporateIdentity, IdentityProfile } from '../../../../types/identity'
import { Grid } from '@material-ui/core'
import AddressForm from './components/address'
import IdentitySection from './components/section'
import Declarations from './components/declaration'
import UserInfoComponent from './components/user-info'
import Dataroom from './components/dataroom'
import declarations, { formatDeclarations } from './const/declarations'
import documents from './const/documents'
import { FormContext, useForm } from 'react-hook-form'
import CompanyInformation from './components/company-info'
import { snackbarService } from 'uno-material-ui'

const IndividualIdentityForm = ({ identity, editMode, useOwnEmail }: { identity: CorporateIdentity, editMode: boolean, useOwnEmail: boolean }) => {
  const form = useForm()
  const onDelete = async (source: IdentityProfile[], i: number) => {
    if (source.length === 1) {
      await snackbarService.showSnackbar('Cannot delete only entry', 'error')
    }
  }
  const onAdd = () => console.log('will add')

  return (
    <FormContext {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <IdentitySection title='Company Information'>
            <CompanyInformation corporate={identity} useOwnEmail={useOwnEmail} editMode={editMode} />
          </IdentitySection>
        </Grid>
        <Grid item xs={12}>
          <IdentitySection title='Company Address'>
            <AddressForm address={identity.companyAddress} editMode={editMode} />
          </IdentitySection>
        </Grid>
        {identity.representatives.map((e, i) => (
          <Grid item xs={12} key={e.email ?? 'email'}>
            <IdentitySection
              title='Company Representative'
              onAdd={editMode && i === identity.representatives.length - 1 ? onAdd : undefined}
              onDelete={editMode ? async () => await onDelete(identity.representatives, i) : undefined}
            >
              <UserInfoComponent identity={e} useOwnEmail={false} editMode={editMode} />
            </IdentitySection>
          </Grid>
        ))}
        {identity.directors.map((e, i) => (
          <Grid item xs={12} key={e.email ?? 'email'}>
            <IdentitySection
              title='Company Director'
              onAdd={editMode && i === identity.directors.length - 1 ? onAdd : undefined}
              onDelete={editMode ? async () => await onDelete(identity.directors, i) : undefined}
            >
              <UserInfoComponent identity={e} useOwnEmail={false} editMode={editMode} />
            </IdentitySection>
          </Grid>
        ))}
        {identity.beneficialOwners.map((e, i) => (
          <Grid item xs={12} key={e.email ?? 'email'}>
            <IdentitySection
              title='Beneficial Owner'
              onAdd={editMode && i === identity.beneficialOwners.length - 1 ? onAdd : undefined}
              onDelete={editMode ? async () => await onDelete(identity.beneficialOwners, i) : undefined}
            >
              <UserInfoComponent identity={e} useOwnEmail={false} editMode={editMode} />
            </IdentitySection>
          </Grid>
        ))}
        <Grid item xs={12}>
          <IdentitySection title='Documents'>
            <Dataroom documentsList={documents.corporate} dataroom={identity.documents ?? []} editMode={editMode} />
          </IdentitySection>
        </Grid>
        <Grid item xs={12}>
          <IdentitySection
            title='Declaration & Acknowledgement'
            subtitle='Confirmation'
          >
            <Declarations
              editMode={editMode}
              declarations={formatDeclarations(identity.declarations || declarations.corporate, 'corporate')}
            />
          </IdentitySection>
        </Grid>
      </Grid>
    </FormContext>
  )
}

export default IndividualIdentityForm
