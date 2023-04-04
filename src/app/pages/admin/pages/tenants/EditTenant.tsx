import React from 'react'
import { TenantForm } from './components/TenantForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { useHistory, useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import { RootContainer } from 'ui/RootContainer'
import { tenantsURL } from 'config/apiURL'
import apiService from 'services/api'
import { tenantsQueryKeys } from 'config/queryKeys'
import { useQuery } from 'react-query'
import { AdminRoute } from '../../router/config'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

export const EditTenant = () => {
  const { tenantId } = useParams<{ tenantId: string; issuerId: string }>()
  const url = tenantsURL.getTenantInfoById(tenantId)
  const getInfo = async () => await apiService.get(url)
  const { replace } = useHistory()

  const { data: result, isLoading } = useQuery(
    tenantsQueryKeys.getTenantById + tenantId,
    getInfo,
    {
      enabled: tenantId
    }
  )

  if (!isLoading && result === undefined) {
    replace(AdminRoute.tenants)
  }

  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Edit Tenant' />
      </Grid>
      <RootContainer>
        <Grid item>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <TenantForm tenant={result?.data} />
          )}
        </Grid>
      </RootContainer>
    </Grid>
  )
}
