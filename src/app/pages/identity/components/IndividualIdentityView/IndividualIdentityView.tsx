import React from 'react'
import { Grid, Paper } from '@mui/material'
import { IdentityDocumentsView } from 'app/pages/identity/components/IdentityDocumentsView/IdentityDocumentsView'
import { privateClassNames } from 'helpers/classnames'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { IndividualInfoView } from './IndividualInfoView/IndividualInfoView'
import { AddressView } from './AddressView/AddressView'
import { FinancialView } from './FinancialView/FinancialView'
import { TaxDeclarationView } from './TaxDeclarationView/TaxDeclarationView'
import { InvestorDeclarationView } from './InvestorDeclarationView/InvestorDeclarationView'
import { IndividualIdentity } from '../../types/forms'

export interface IndividualIdentityViewProps {
  data: IndividualIdentity
}

export const IndividualIdentityView = ({
  data
}: IndividualIdentityViewProps) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <FormSectionHeader title='Overview' />
          <IndividualInfoView data={data} />
        </Paper>
      </Grid>

      <Grid item xs={12} className={privateClassNames()}>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <FormSectionHeader title='Address' />
          <AddressView data={data.address} />
        </Paper>
      </Grid>

      <Grid item xs={12} className={privateClassNames()}>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <FormSectionHeader title='Financial Information' />
          <FinancialView data={data} />
        </Paper>
      </Grid>

      <Grid item xs={12} className={privateClassNames()}>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <FormSectionHeader title='Tax Declaration' />
          <TaxDeclarationView data={data} />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <FormSectionHeader title='Investor Status Declaration' />
          <InvestorDeclarationView data={data} />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <FormSectionHeader title='Documents' />
          <IdentityDocumentsView data={data.documents} type='individual' />
        </Paper>
      </Grid>
    </Grid>
  )
}
