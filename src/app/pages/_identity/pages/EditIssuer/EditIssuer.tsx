import React from 'react'
import { Grid } from '@material-ui/core'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'
import { VSpacer } from 'components/VSpacer'
import { CorporateIssuerForm } from 'app/pages/_identity/components/CorporateIssuerForm/CorporateIssuerForm'
import { useParams } from 'react-router-dom'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const EditIssuer: React.FC = () => {
  const { data, isLoading } = useAllCorporates({ type: 'issuer' })
  const { identityId } = useParams<{ identityId: string }>()
  const identity = data.map[identityId]

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <PageHeader title={identity.companyLegalName} />
      </Grid>
      <Grid container item xs={12}>
        <VSpacer size='medium' />
      </Grid>
      <Grid item xs={12}>
        <CorporateIssuerForm />
      </Grid>
    </Grid>
  )
}
