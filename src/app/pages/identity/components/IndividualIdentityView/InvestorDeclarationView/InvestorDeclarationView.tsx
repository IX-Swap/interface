import React from 'react'
import { Grid, Paper } from '@mui/material'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
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
import { VSpacer } from 'components/VSpacer'
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
    digitalSecuritiesIssuance: 'Issuance of Digital Securities by the Issuers',
    allServices: 'Any/all Services/Products offered by InvestaX'
  }

  const isCorporate = identityType === 'corporate'

  return (
    <Grid container spacing={4}>
      <Grid item sx={{ width: '100%' }}>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <FormSectionHeader title='Investor Status Declaration' />
          <VSpacer size='medium' />
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
          <VSpacer size='medium' />
          {optInAgreements && (
            <DeclarationsList
              title='I confirm to be treated as an “Accredited Investor” by InvestaX'
              data={{ optInAgreements }}
              labelMap={{
                optInAgreements: <OptInAgreements />
              }}
            />
          )}
          {optInAgreementsOptOut !== undefined && (
            <DeclarationsList
              title='I confirm to be treated as an “Accredited Investor” by InvestaX 22'
              data={{ optInAgreementsOptOut }}
              labelMap={{
                optInAgreementsOptOut: <OptInAgreementsIndividual />
              }}
            />
          )}
          {optInAgreementsSafeguards !== undefined && (
            <DeclarationsList
              title='I confirm to be treated as an “Accredited Investor” by InvestaX 22'
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
                <VSpacer size='medium' />
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
