import React from 'react'
import { CorporateIssuerView } from 'app/pages/_identity/components/CorporateIssuerView/CorporateIssuerView'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { useParams } from 'react-router-dom'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'
import { Grid } from '@material-ui/core'

export const ViewIssuer = () => {
  const params = useParams<{ identityId: string }>()
  const {
    data: { map },
    isLoading
  } = useAllCorporates({})
  const data = map[params.identityId]

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <PageHeader title={data.companyLegalName} />
      </Grid>
      <Grid item xs={12}>
        <CorporateIssuerView />
      </Grid>
    </Grid>
  )
}
