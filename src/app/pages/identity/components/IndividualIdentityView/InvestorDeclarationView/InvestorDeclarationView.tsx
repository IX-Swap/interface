import React from 'react'
import { Box, Grid } from '@mui/material'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { DeclarationsList } from 'app/pages/identity/components/DeclarationsList/DeclarationsList'
import {
  corporateInvestorAgreementsMap,
  individualInvestorAgreementsMap
} from 'app/pages/identity/components/InvestorDeclarationForm/InvestorAgreements/agreements'
import { OptInAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/OptInAgreements/OptInAgreements'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'
import { IdentityType } from 'app/pages/identity/utils/shared'

export interface StatusDeclaration {
  accreditedInvestorDeclaration: Record<string, boolean>
  optInRequirement: Record<string, boolean>
  accreditedInvestorOptOut: Record<string, boolean | undefined>
}

export interface InvestorDeclarationViewProps {
  data: IndividualIdentity | CorporateIdentity
  identityType?: IdentityType
}

export const InvestorDeclarationView: React.FC<
  InvestorDeclarationViewProps
> = ({ data, identityType = 'individual' }) => {
  const {
    financialAsset,
    income,
    jointlyHeldAccount,
    personalAssets,
    assets,
    trustee,
    accreditedShareholders,
    partnership,
    accreditedBeneficiaries,
    accreditedSettlors,
    optInAgreements
  } = data.declarations?.investorsStatus ?? {}

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
    optInAgreements: optInAgreements ?? false
  }

  const isCorporate = identityType === 'corporate'

  return (
    <Grid container>
      <DeclarationsList
        title={`I declare that I am ${
          isCorporate ? 'a corporate' : 'an individual'
        } "Accredited Investor"`}
        data={
          identityType === 'individual'
            ? accreditedInvestorDeclaration
            : corporateInvestorDeclaration
        }
        labelMap={
          identityType === 'individual'
            ? individualInvestorAgreementsMap
            : corporateInvestorAgreementsMap
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
        labelMap={{
          optInAgreements: <OptInAgreements />
        }}
      />
    </Grid>
  )
}
