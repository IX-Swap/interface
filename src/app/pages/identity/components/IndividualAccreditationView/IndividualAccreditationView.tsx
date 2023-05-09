import React from 'react'
import { Grid } from '@mui/material'
import { IndividualIdentity } from 'app/pages/identity/types/forms'

import { InvestorDeclarationView } from 'app/pages/identity/components/CorporateAccreditationView/InvestorDeclarationView'

import { FieldContainer } from '../../../../../ui/FieldContainer/FieldContainer'
import { FormSectionHeader } from '../../../../../ui/FormSectionHeader/FormSectionHeader'
import { IdentityDocumentsView } from '../IdentityDocumentsView/IdentityDocumentsView'

import { OptInRequirementView } from '../IndividualIdentityView/OptInRequirementView/OptInRequirementView'

export interface IndividualAccreditationViewProps {
  data: IndividualIdentity
  showReview?: boolean
}

export const IndividualAccreditationView = ({
  data
}: IndividualAccreditationViewProps) => {
  return (
    <Grid container direction={'column'} spacing={2}>
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