import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { DeclarationsList } from 'app/pages/_identity/components/DeclarationsList/DeclarationsList'
import { IndividualIdentity } from '../../../../../../types/identity'
import {
  investorDeclarationLabelMap,
  optInDeclarationLabelMap
} from '../../InvestorDeclarationForm/InvestorDeclarationForm'
export interface StatusDeclaration {
  accreditedInvestorDeclaration: Record<string, boolean>
  optInRequirement: Record<string, boolean>
  accreditedInvestorOptOut: Record<string, boolean>
}

export interface InvestorDeclarationViewProps {
  data: IndividualIdentity
}

export const InvestorDeclarationView: React.FC<InvestorDeclarationViewProps> = ({
  data
}) => {
  const {
    consent,
    consequencesOfQualification,
    financialAsset,
    income,
    jointlyHeldAccount,
    personalAssets,
    rightToOptOut
  } = data.declarations.investorsStatus

  const accreditedInvestorDeclaration = {
    personalAssets,
    income,
    financialAsset,
    jointlyHeldAccount
  }

  const optInRequirement = {
    consent,
    consequencesOfQualification,
    rightToOptOut
  }

  // const accreditedInvestorOptOut = {}

  return (
    <Grid container>
      <DeclarationsList
        title='I declare that I am an individual "Accredited Investor"'
        data={accreditedInvestorDeclaration}
        labelMap={investorDeclarationLabelMap}
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
      {/* <DeclarationsList */}
      {/*  title='My/Our withdrawal of consent to be treated as an Accredited Investor by InvestaX is in respect of the following services.' */}
      {/*  data={accreditedInvestorOptOut} */}
      {/* /> */}
    </Grid>
  )
}
