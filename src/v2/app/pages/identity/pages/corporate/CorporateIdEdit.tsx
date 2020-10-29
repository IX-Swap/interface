import React from 'react'
import { Grid } from '@material-ui/core'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { useAllCorporateIdentities } from 'v2/hooks/identity/useAllCorporateIdentities'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { useUpdateCorporateIdentity } from 'v2/hooks/identity/useUpdateCorporateIdentity'
import { CancelButton } from 'v2/app/pages/identity/components/CancelButton'
import { VSpacer } from 'v2/components/VSpacer'
import { useSetPageTitle } from 'v2/app/hooks/useSetPageTitle'

export const CorporateIdEdit: React.FC = () => {
  const { data, status } = useAllCorporateIdentities()
  const {
    paths,
    params: { identityId }
  } = useIdentitiesRouter()
  const [updateCorporateId] = useUpdateCorporateIdentity(identityId)
  const identity = data.map[identityId]

  useSetPageTitle(identity?.companyLegalName)

  if (status === 'loading') {
    return null
  }

  return (
    <Grid container>
      <Grid container item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <CorporateIdentityForm
          data={identity}
          submitButtonText='Save'
          onSubmit={updateCorporateId}
          cancelButton={
            <CancelButton
              link={paths.corporate}
              params={{ identityId }}
              replace
            />
          }
        />
      </Grid>
    </Grid>
  )
}
