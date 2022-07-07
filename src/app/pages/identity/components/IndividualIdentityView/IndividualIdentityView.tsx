import React from 'react'
import { Grid } from '@mui/material'
import { IdentityDocumentsView } from 'app/pages/identity/components/IdentityDocumentsView/IdentityDocumentsView'
import { privateClassNames } from 'helpers/classnames'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { IndividualInfoView } from './IndividualInfoView/IndividualInfoView'
import { AddressView } from './AddressView/AddressView'
import { FinancialView } from './FinancialView/FinancialView'
import { IndividualIdentity } from '../../types/forms'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { CountryTaxDeclaration } from 'app/pages/identity/components/CountryTaxDeclarations/CountryTaxDeclaration'
import { FatcaView } from 'app/pages/identity/components/IndividualIdentityView/FatcaView/FatcaViewView'
import { InvestorDeclarationView } from 'app/pages/identity/components/CorporateIdentityView/InvestorDeclarationView'
import { OptInRequirementView } from 'app/pages/identity/components/IndividualIdentityView/OptInRequirementView/OptInRequirementView'
import { NoticeOfAssessmentView } from 'app/pages/identity/components/IndividualIdentityView/NoticeOfAssessment/NoticeOfAssessmentView'

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

      <NoticeOfAssessmentView />

      <Grid item className={privateClassNames()}>
        <CountryTaxDeclaration taxResidencies={data.taxResidencies} />
      </Grid>

      <Grid item>
        <FatcaView data={data} />
      </Grid>

      <Grid item>
        <InvestorDeclarationView isCorporate={false} data={data} />
      </Grid>

      <Grid item>
        <OptInRequirementView data={data} />
      </Grid>

      <Grid item>
        <FieldContainer>
          <Grid item container direction={'column'} spacing={3}>
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
