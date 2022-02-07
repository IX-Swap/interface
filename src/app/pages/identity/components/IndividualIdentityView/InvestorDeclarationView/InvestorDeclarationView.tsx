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
  accreditedInvestorOptOut: Record<string, boolean>
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

    allServices,
    digitalSecurities,
    primaryOfferingServices,
    digitalSecuritiesIssuance,

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

  const accreditedInvestorOptOut = {
    allServices,
    digitalSecurities,
    primaryOfferingServices,
    digitalSecuritiesIssuance
  }

  const optInRequirement = {
    optInAgreements
  }

  const accreditedInvestorOptOutLabelMap = {
    digitalSecurities:
      'Trading in digital securities on the InvestaX private exchange',
    primaryOfferingServices:
      'Use of Primary Offering Services for the purpose of fundraising',
    digitalSecuritiesIssuance: 'Issuance of Digital Securities by the Issuers',
    allServices: 'Any/all Services/Products offered by InvestaX'
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
      {Object.values(accreditedInvestorOptOut).find(item => item) !==
      undefined ? (
        <>
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
        </>
      ) : null}
    </Grid>
  )
}
