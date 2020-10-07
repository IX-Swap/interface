import React from 'react'
import { PageTitle } from 'v2/app/components/PageTitle'
import { Grid } from '@material-ui/core'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { useAllCorporateIdentities } from 'v2/hooks/identity/useAllCorporateIdentities'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { EditButton } from 'v2/app/pages/identity/components/EditButton'
import { VSpacer } from '../../../../../components/VSpacer'

export const CorporateIdView: React.FC = () => {
  const { data, status } = useAllCorporateIdentities()
  const {
    paths,
    params: { identityId }
  } = useIdentitiesRouter()

  if (status === 'loading') {
    return null
  }

  const identity = data.map[identityId]

  return (
    <Grid container>
      <Grid container item justify='flex-end' alignItems='center'>
        <EditButton link={paths.editCorporate} params={{ identityId }} />
      </Grid>
      <Grid item container>
        <VSpacer size='small' />
      </Grid>
      <Grid item>
        <CorporateIdentityForm
          data={identity}
          isEditing={false}
          useOwnEmail={false}
        />
      </Grid>
    </Grid>
  )
}
