import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { DeclarationsList } from 'app/pages/_identity/components/DeclarationsList/DeclarationsList'
import {
  CorporateIdentity,
  IndividualIdentity
} from '../../../../../../types/identity'
import {
  investorDeclarationLabelMap,
  corporateInvestorDeclarationLabelMap,
  optInDeclarationLabelMap
} from '../../InvestorDeclarationForm/InvestorDeclarationForm'
import { IdentityType } from 'app/pages/identity/utils'

export interface StatusDeclaration {
  accreditedInvestorDeclaration: Record<string, boolean>
  optInRequirement: Record<string, boolean>
  accreditedInvestorOptOut: Record<string, boolean>
}

export interface InvestorDeclarationViewProps {
  data: IndividualIdentity | CorporateIdentity
  identityType?: IdentityType
}

export const InvestorDeclarationView: React.FC<InvestorDeclarationViewProps> = ({
  data,
  identityType = 'individual'
}) => {
  const {
    consent,
    consequencesOfQualification,
    financialAsset,
    income,
    jointlyHeldAccount,
    personalAssets,
    rightToOptOut,
    assets,
    trustee,
    accreditedShareholders,
    partnership,
    accreditedBeneficiaries,
    accreditedSettlors
  } = data.declarations.investorsStatus ?? {}

  const accreditedInvestorDeclaration = {
    personalAssets,
    income,
    financialAsset,
    jointlyHeldAccount
  }

  const corporateInvestorDeclaration = {
    assets,
    trustee,
    accreditedShareholders,
    partnership,
    accreditedBeneficiaries,
    accreditedSettlors
  }

  const optInRequirement = {
    consent,
    consequencesOfQualification,
    rightToOptOut
  }

  const accreditedInvestorOptOut = {
    // To do: fetch from actual data
    tradingDigitalSecurites: false,
    fundRaising: false,
    issuance: false,
    allServices: false
  }

  const accreditedInvestorOptOutLabelMap = {
    tradingDigitalSecurites:
      'Trading in digital securities on the InvestaX private exchange',
    fundRaising:
      'Use of Primary Offering Services for the purpose of fundraising',
    issuance: 'Issuance of Digital Securities by the Issuers',
    allServices: 'Any/all Services/Products offered by InvestaX'
  }

  return (
    <Grid container>
      <DeclarationsList
        title='I declare that I am an individual "Accredited Investor"'
        data={
          identityType === 'individual'
            ? accreditedInvestorDeclaration
            : corporateInvestorDeclaration
        }
        labelMap={
          identityType === 'individual'
            ? investorDeclarationLabelMap
            : corporateInvestorDeclarationLabelMap
        }
      />
      <Grid item xs={12}>
        <Box marginTop={8}>
          <FormSectionHeader title='Opt-In Requirement' variant='h5' />
        </Box>
      </Grid>
      <DeclarationsList
        title='I confirm to be treated as an “Accredited Investor” by InvestaX'
        data={optInRequirement}
        labelMap={optInDeclarationLabelMap}
      />
      <Grid item xs={12}>
        <Box marginTop={8}>
          <FormSectionHeader
            title='Accredited Investor Opt-Out Form'
            variant='h5'
          />
        </Box>
      </Grid>
      <DeclarationsList
        title='My/Our withdrawal of consent to be treated as an Accredited Investor by InvestaX is in respect of the following services.'
        data={accreditedInvestorOptOut}
        labelMap={accreditedInvestorOptOutLabelMap}
      />
    </Grid>
  )
}
