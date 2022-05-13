import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { AdminRoute } from 'app/pages/admin/router/config'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { CorporateIdentityView } from 'app/pages/identity/components/CorporateIdentityView/CorporateIdentityView'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'
import { CorporateIdentityContainer } from 'app/pages/identity/containers/CorporateIdentityContainer'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { VSpacer } from 'components/VSpacer'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'

export interface CorporateIdentityProps {
  data: CorporateIdentity
}

export const CorporateIdentityDisplay = ({ data }: CorporateIdentityProps) => {
  const { user } = useAuth()
  const adminId = getIdFromObj(user)

  return (
    <Grid container style={{ display: 'table' }}>
      <Grid item xs={12}>
        <PageHeader title={data.companyLegalName} />
      </Grid>
      <RootContainer>
        <Grid item xs={12}>
          <RejectionMessage data={data} />
        </Grid>
        <Grid
          xs={12}
          container
          item
          justifyContent='flex-end'
          alignItems='center'
        >
          {adminId === data.createdBy ? (
            <EditButton
              link={AdminRoute.createCorporateIdentity}
              params={{ userId: data.user._id }}
            />
          ) : null}
        </Grid>
        <Grid item xs={12} container>
          <VSpacer size='small' />
        </Grid>
        <Grid item xs={12}>
          <CorporateIdentityView data={data} />
        </Grid>
      </RootContainer>
    </Grid>
  )
}

export const ViewCorporateIdentity = () => {
  return <CorporateIdentityContainer component={CorporateIdentityDisplay} />
}
