import React from 'react'
import {
  corporateInvestorAgreementsMap,
  individualInvestorAgreementsMap
} from 'app/pages/identity/components/InvestorDeclarationForm/InvestorAgreements/agreements'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'
import { CorporateDeclarationsList } from 'app/pages/identity/components/CorporateIdentityView/CorporateDeclarationsList'

export interface InvestorDeclarationViewProps {
  data: IndividualIdentity | CorporateIdentity
  isCorporate?: boolean
}

export const InvestorDeclarationView = ({
  data,
  isCorporate = true
}: InvestorDeclarationViewProps) => {
  const {
    assets,
    trustee,
    accreditedShareholders,
    partnership,
    accreditedBeneficiaries,
    accreditedSettlors,
    personalAssets,
    income,
    financialAsset,
    jointlyHeldAccount
  } = data.declarations?.investorsStatus ?? {}

  const corporateInvestorDeclaration = {
    assets,
    trustee,
    accreditedShareholders,
    partnership,
    accreditedBeneficiaries,
    accreditedSettlors
  }

  const individualAccreditedInvestor = {
    personalAssets,
    income,
    financialAsset,
    jointlyHeldAccount
  }

  return (
    <CorporateDeclarationsList
      title={'Investor Status Declaration'}
      subtitle={
        isCorporate
          ? 'I declare that I am "Corporate Accredited Investor"'
          : 'I declare that I am "Individual Accredited Investor"'
      }
      data={
        isCorporate
          ? corporateInvestorDeclaration
          : individualAccreditedInvestor
      }
      labelMap={
        isCorporate
          ? corporateInvestorAgreementsMap
          : individualInvestorAgreementsMap
      }
    />
  )
}
