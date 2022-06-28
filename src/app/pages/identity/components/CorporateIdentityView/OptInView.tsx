import React from 'react'
import { Grid } from '@mui/material'
import { DeclarationsList } from 'app/pages/identity/components/DeclarationsList/DeclarationsList'
import { OptInAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/OptInAgreements/OptInAgreements'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { CorporateDeclarationsList } from 'app/pages/identity/components/CorporateIdentityView/CorporateDeclarationsList'

export interface OptInViewProps {
  data: IndividualIdentity | CorporateIdentity
}

export const OptInView: React.FC<OptInViewProps> = ({ data }) => {
  const {
    allServices,
    digitalSecurities,
    primaryOfferingServices,
    digitalSecuritiesIssuance,
    optInAgreements
  } = data.declarations?.investorsStatus ?? {}

  const accreditedInvestorOptOut = {
    allServices,
    digitalSecurities,
    primaryOfferingServices,
    digitalSecuritiesIssuance
  }

  const optInRequirement = {
    optInAgreements: optInAgreements !== undefined
  }

  const accreditedInvestorOptOutLabelMap = {
    digitalSecurities:
      'Trading in digital securities on the InvestaX private exchange',
    primaryOfferingServices:
      'Use of Primary Offering Services for the purpose of fundraising',
    digitalSecuritiesIssuance: 'Issuance of Digital Securities by the Issuers',
    allServices: 'Any/all Services/Products offered by InvestaX'
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
        <Grid item container direction={'column'} spacing={5}>
          <Grid item>
            <FormSectionHeader title='Accredited Investor Opt-Out Form' />
          </Grid>
          <Grid item>
            <CorporateDeclarationsList
              subtitle='My/Our withdrawal of consent to be treated as an Accredited Investor by InvestaX is in respect of the following services.'
              data={accreditedInvestorOptOut}
              labelMap={accreditedInvestorOptOutLabelMap}
            />
          </Grid>
        </Grid>
      </Grid>
    </FieldContainer>
  )
}
