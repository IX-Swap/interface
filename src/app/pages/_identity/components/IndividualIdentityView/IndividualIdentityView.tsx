import React from 'react'
import { Grid } from '@material-ui/core'
import { IdentityDocumentsView } from 'app/pages/_identity/components/IdentityDocumentsView/IdentityDocumentsView'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getPersonName } from 'helpers/strings'
import { privateClassNames } from 'helpers/classnames'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { IndividualInfoView } from './IndividualInfoView/IndividualInfoView'
import { AddressView } from './AddressView/AddressView'
import { FinancialView } from './FinancialView/FinancialView'
import { TaxDeclarationView } from './TaxDeclarationView/TaxDeclarationView'
import { InvestorDeclarationView } from './InvestorDeclarationView/InvestorDeclarationView'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'

export const IndividualIdentityView = () => {
  const { data, isLoading } = useIndividualIdentity()

  useSetPageTitle(getPersonName(data))

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FormSectionHeader title='Overview' />
        <IndividualInfoView data={data} />
      </Grid>

      <Grid item xs={12} className={privateClassNames()}>
        <FormSectionHeader title='Address' />
        <AddressView data={data.address} />
      </Grid>

      <Grid item xs={12} className={privateClassNames()}>
        <FormSectionHeader title='Financial Information' />
        <FinancialView data={data} />
      </Grid>

      <Grid item xs={12} className={privateClassNames()}>
        <FormSectionHeader title='Tax Declaration' />
        <TaxDeclarationView data={data} />
      </Grid>

      <Grid item xs={12}>
        <FormSectionHeader title='Investor Status Declaration' />
        <InvestorDeclarationView data={data} />
      </Grid>

      <Grid item xs={12}>
        <FormSectionHeader title='Documents' />
        <IdentityDocumentsView data={data.documents} type='individual' />
      </Grid>
    </Grid>
  )
}
