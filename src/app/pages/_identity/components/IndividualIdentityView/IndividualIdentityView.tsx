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

export interface IndividualIdentityViewProps {
  // TODO Delete any after added new interfaces for IndividualIdentity
  data: any
}

export const IndividualIdentityView = (props: IndividualIdentityViewProps) => {
  const { data } = props

  useSetPageTitle(getPersonName(data))

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
        <TaxDeclarationView data={data.taxDeclaration} />
      </Grid>

      <Grid item xs={12}>
        <FormSectionHeader title='Documents' />
        <IdentityDocumentsView data={data.documents} type='individual' />
      </Grid>

      <Grid item xs={12}>
        <FormSectionHeader title='Investors Status Declaration' />
        <InvestorDeclarationView data={data.investorDeclaration} />
      </Grid>

      <Grid item xs={12}>
        <FormSectionHeader title='Agreements and Disclosures' />
        <AgreementsAndDisclosuresView data={data.agreementsAndDisclosures} />
      </Grid>
    </Grid>
  )
}
