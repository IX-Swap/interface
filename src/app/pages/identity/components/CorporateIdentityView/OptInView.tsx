import { Grid } from '@mui/material'
import { DeclarationsList } from 'app/pages/identity/components/DeclarationsList/DeclarationsList'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { OptInAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/OptInAgreements/OptInAgreements'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'
import React from 'react'

export interface OptInViewProps {
  data: IndividualIdentity | CorporateIdentity
}

export const OptInView: React.FC<OptInViewProps> = ({ data }) => {
  const { optInAgreements } = data.declarations?.investorsStatus ?? {}

  const optInRequirement = {
    optInAgreements: optInAgreements ?? false
  }

  return (
    <FieldContainer>
      <Grid container direction={'column'} spacing={5}>
        <Grid item container spacing={3} direction={'column'}>
          <Grid item>
            <FormSectionHeader title='Opt-In Requirement' />
          </Grid>
          <Grid item>
            <DeclarationsList
              title='I confirm to be treated as an “Accredited Investor” by InvestaX'
              data={optInRequirement}
              labelMap={{
                optInAgreements: <OptInAgreements />
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </FieldContainer>
  )
}
