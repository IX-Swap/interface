import React from 'react'
import { Grid, Paper, Typography, Box } from '@mui/material'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { DeclarationsList } from 'app/pages/identity/components/DeclarationsList/DeclarationsList'
import {
  corporateInvestorAgreementsMap,
  individualInvestorAgreementsMap
} from 'app/pages/identity/components/InvestorDeclarationForm/InvestorAgreements/agreements'
import {
  OptInAgreements,
  OptInAgreementsIndividual
} from 'app/pages/identity/components/InvestorDeclarationForm/OptInAgreements/OptInAgreements'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'
import { IdentityType } from 'app/pages/identity/utils/shared'
import { SafeguardAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/SafeguardsAgreements/SafeguardAgreements'

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

    optInAgreements,
    optInAgreementsSafeguards,
    optInAgreementsOptOut
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

  const accreditedInvestorOptOutLabelMap = {
    digitalSecurities:
      'Trading in digital securities on the InvestaX private exchange',
    primaryOfferingServices:
      'Use of Primary Offering Services for the purpose of fundraising',
    digitalSecuritiesIssuance: 'Issuance of Security Tokens by the Issuers',
    allServices: 'Any/all Services/Products offered by InvestaX'
  }

  const isCorporate = identityType === 'corporate'

  return (
    <Grid container spacing={4}>
      <Grid item sx={{ width: '100%' }}>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <FormSectionHeader title='Investor Status Declaration' />
          <Box py={2} />
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
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <FormSectionHeader title='Opt-In Requirement' />
          <Box py={2} />
          <Typography fontWeight={500} variant={'subtitle1'}>
            I confirm to be treated as an “Accredited Investor” by InvestaX
          </Typography>
          {optInAgreements !== undefined && (
            <DeclarationsList
              title=''
              data={{ optInAgreements }}
              labelMap={{
                optInAgreements: <OptInAgreements />
              }}
            />
          )}
          {optInAgreementsOptOut !== undefined && (
            <DeclarationsList
              title=''
              data={{ optInAgreementsOptOut }}
              labelMap={{
                optInAgreementsOptOut: <OptInAgreementsIndividual />
              }}
            />
          )}
          {optInAgreementsSafeguards !== undefined && (
            <DeclarationsList
              title=''
              data={{ optInAgreementsSafeguards }}
              labelMap={{
                optInAgreementsSafeguards: <SafeguardAgreements />
              }}
            />
          )}

          {Object.values(accreditedInvestorOptOut).find(item => item) !==
          undefined ? (
            <>
              <Grid item xs={12}>
                <FormSectionHeader title='Accredited Investor Opt-Out Form' />
                <Box py={2} />
              </Grid>
              <DeclarationsList
                title='My/Our withdrawal of consent to be treated as an Accredited Investor by InvestaX is in respect of the following services.'
                data={accreditedInvestorOptOut}
                labelMap={accreditedInvestorOptOutLabelMap}
              />
            </>
          ) : null}
        </Paper>
      </Grid>
    </Grid>
  )
}
