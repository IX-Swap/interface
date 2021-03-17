import React from 'react'
import { Grid } from '@material-ui/core'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'
import { VSpacer } from 'components/VSpacer'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { CorporateIssuerForm } from 'app/pages/_identity/components/CorporateIssuerForm/CorporateIssuerForm'
import { useParams } from 'react-router-dom'

export const EditIssuer: React.FC = () => {
  const { data, isLoading } = useAllCorporates({ type: 'issuer' })
  const { identityId } = useParams<{ identityId: string }>()
  const identity = data.map[identityId]

  useSetPageTitle(identity?.companyLegalName)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container>
      <Grid container item xs={12}>
        <VSpacer size='medium' />
      </Grid>
      <Grid item xs={12}>
        <CorporateIssuerForm />
      </Grid>
    </Grid>
  )
}
