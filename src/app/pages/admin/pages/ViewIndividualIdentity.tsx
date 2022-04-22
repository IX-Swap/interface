import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { AdminRoute } from 'app/pages/admin/router/config'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'
import { IndividualIdentityContainer } from 'app/pages/identity/containers/IndividualIdentityContainer'
import { IndividualIdentityView } from 'app/pages/identity/components/IndividualIdentityView/IndividualIdentityView'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
import { getIdFromObj, getPersonName } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { IndividualIdentity } from 'app/pages/identity/types/forms'

export interface IndividualIdentityDisplayProps {
  data: IndividualIdentity
}

export const IndividualIdentityDisplay = ({
  data
}: IndividualIdentityDisplayProps) => {
  const { user } = useAuth()
  const adminId = getIdFromObj(user)

  return (
    <Grid container>
      <Grid item xs={12}>
        <PageHeader title={getPersonName(data)} />
      </Grid>
      <Grid item xs={12}>
        <RejectionMessage data={data} />
      </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent='flex-end'
        alignItems='center'
      >
        {adminId === data.createdBy ? (
          <EditButton
            link={AdminRoute.createIndividualIdentity}
            params={{ userId: data.user._id }}
          />
        ) : null}
      </Grid>
      <Grid item container xs={12}>
        <VSpacer size='small' />
      </Grid>
      <Grid item xs={12}>
        <IndividualIdentityView data={data} />
      </Grid>
    </Grid>
  )
}

export const ViewIndividualIdentity = () => {
  return <IndividualIdentityContainer component={IndividualIdentityDisplay} />
}
