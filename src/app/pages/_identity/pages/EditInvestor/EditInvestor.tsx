import React from 'react'
import { Grid } from '@material-ui/core'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'
import { VSpacer } from 'components/VSpacer'
import { CorporateInvestorForm } from 'app/pages/_identity/components/CorporateInvestorForm/CorporateInvestorForm'
import { useParams } from 'react-router-dom'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const EditInvestor: React.FC = () => {
  const { data, status } = useAllCorporates({ type: 'investor' })
  const params = useParams<{ identityId: string }>()
  const identity = data.map[params.identityId]

  if (status === 'loading') {
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
        <CorporateInvestorForm />
      </Grid>
    </Grid>
  )
}
