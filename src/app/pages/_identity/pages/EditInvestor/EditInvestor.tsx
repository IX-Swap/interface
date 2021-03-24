import React from 'react'
import { Grid } from '@material-ui/core'
import { useIdentitiesRouter } from 'app/pages/_identity/router'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'
import { VSpacer } from 'components/VSpacer'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { CorporateInvestorForm } from 'app/pages/_identity/components/CorporateInvestorForm/CorporateInvestorForm'

export const EditInvestor: React.FC = () => {
  const { data, status } = useAllCorporates({ type: 'investor' })
  const {
    params: { identityId }
  } = useIdentitiesRouter()
  const identity = data.map[identityId]

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
