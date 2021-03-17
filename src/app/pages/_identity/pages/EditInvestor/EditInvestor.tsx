import React from 'react'
import { Grid } from '@material-ui/core'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'
import { VSpacer } from 'components/VSpacer'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { CorporateInvestorForm } from 'app/pages/_identity/components/CorporateInvestorForm/CorporateInvestorForm'
import { useParams } from 'react-router-dom'

export const EditInvestor: React.FC = () => {
  const { data, status } = useAllCorporates({ type: 'investor' })
  const params = useParams<{ identityId: string }>()
  const identity = data.map[params.identityId]

  useSetPageTitle(identity?.companyLegalName)

  if (status === 'loading') {
    return null
  }

  return (
    <Grid container>
      <Grid container item xs={12}>
        <VSpacer size='medium' />
      </Grid>
      <Grid item xs={12}>
        <CorporateInvestorForm />
      </Grid>
    </Grid>
  )
}
