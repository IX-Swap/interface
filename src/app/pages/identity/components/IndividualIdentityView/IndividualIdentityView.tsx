import React from 'react'
import { Grid } from '@mui/material'
import { IdentityDocumentsView } from 'app/pages/identity/components/IdentityDocumentsView/IdentityDocumentsView'
import { privateClassNames } from 'helpers/classnames'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { IndividualInfoView } from './IndividualInfoView/IndividualInfoView'
import { AddressView } from './AddressView/AddressView'
import { FinancialView } from './FinancialView/FinancialView'
import { TaxDeclarationView } from './TaxDeclarationView/TaxDeclarationView'
import { InvestorDeclarationView } from './InvestorDeclarationView/InvestorDeclarationView'
import { IndividualIdentity } from '../../types/forms'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'

export interface IndividualIdentityViewProps {
  data: IndividualIdentity
}

export const IndividualIdentityView = ({
  data
}: IndividualIdentityViewProps) => {
  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <FieldContainer>
          <Grid item container direction={'column'} spacing={5}>
            <Grid item>
              <FormSectionHeader title='Personal Information' />
            </Grid>
            <Grid item>
              <IndividualInfoView data={data} />
            </Grid>
          </Grid>
        </FieldContainer>
      </Grid>

      <Grid item className={privateClassNames()}>
        <FieldContainer>
          <Grid item container direction={'column'} spacing={5}>
            <Grid item>
              <FormSectionHeader title='Address' />
            </Grid>
            <Grid item>
              <AddressView data={data.address} />
            </Grid>
          </Grid>
        </FieldContainer>
      </Grid>

      <Grid item className={privateClassNames()}>
        <FieldContainer>
          <Grid item container direction={'column'} spacing={5}>
            <Grid item>
              <FormSectionHeader title='Financial Information' />
            </Grid>
            <Grid item>
              <FinancialView data={data} />
            </Grid>
          </Grid>
        </FieldContainer>
      </Grid>

      <Grid item className={privateClassNames()}>
        <TaxDeclarationView data={data} />
      </Grid>

      <Grid item>
        <InvestorDeclarationView data={data} />
      </Grid>

      <Grid item>
        <FieldContainer>
          <Grid item container direction={'column'} spacing={5}>
            <Grid item>
              <FormSectionHeader title='Documents' />
            </Grid>
            <Grid item>
              <IdentityDocumentsView data={data.documents} type='individual' />
            </Grid>
          </Grid>
        </FieldContainer>
      </Grid>
    </Grid>
  )
}
