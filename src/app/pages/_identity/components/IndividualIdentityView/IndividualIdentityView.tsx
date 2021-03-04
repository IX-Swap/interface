import React from 'react'
import { Grid } from '@material-ui/core'
import { IdentityDocumentsView } from 'app/pages/identity/components/IdentityDocumentsView'
import { AgreementsAndDisclosuresView } from './AgreementsAndDisclosuresView/AgreementsAndDisclosuresView'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getPersonName } from 'helpers/strings'
import { privateClassNames } from 'helpers/classnames'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { IndividualInfoView } from './IndividualInfoView/IndividualInfoView'
import { AddressView } from './AddressView/AddressView'
import { FinancialView } from './FinancialView/FinancialView'
import { TaxDeclarationView } from './TaxDeclarationView/TaxDeclarationView'
import { InvestorDeclarationView } from './InvestorDeclarationView/InvestorDeclarationView'
import { IndividualIdentity } from 'types/identity'

export interface IndividualIdentityViewProps {
  data: IndividualIdentity | undefined
}

export const IndividualIdentityView = (props: IndividualIdentityViewProps) => {
  const { data } = props

  useSetPageTitle(getPersonName(data))

  if (data === undefined) {
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
        <FormSectionHeader title='Documents' />
        <IdentityDocumentsView data={data} type='individual' />
      </Grid>

      <Grid item xs={12}>
        <FormSectionHeader title='Investors Status Declaration' />
        <InvestorDeclarationView data={data} />
      </Grid>

      <Grid item xs={12}>
        <FormSectionHeader title='Agreements and Disclosures' />

        <AgreementsAndDisclosuresView data={data} />
      </Grid>
    </Grid>
  )
}
