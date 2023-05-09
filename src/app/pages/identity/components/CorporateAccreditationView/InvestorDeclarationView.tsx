import React from 'react'
import {
  corporateInvestorAgreementsMap,
  individualInvestorAgreementsMap,
  expertInvestorAgreementsMap
} from 'app/pages/identity/components/InvestorDeclarationForm/InvestorAgreements/agreements'
// import { institutionalInvestorAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/InstitutionalInvestorAgreements/InstitutionalInvestorAgreements'
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
  const { applyingAs } = data
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
    jointlyHeldAccount,
    expertInvestorAgreement
  } = data.declarations?.investorsStatus ?? {}

  const expertInvestor = {
    expertInvestorAgreement
  }

  const corporateAccreditedInvestor = {
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

  const investorRole: string =
    typeof applyingAs !== 'undefined' && applyingAs.length > 0
      ? applyingAs[0]
      : 'accredited'
  const role = investorRole.charAt(0).toUpperCase() + investorRole.slice(1)

  let agreementsData
  let agreementsMap

  //   if (role === 'institutional') {
  //     agreementsMap = institutionalInvestorAgreements
  //   } else {
  if (investorRole === 'accredited') {
    agreementsData = isCorporate
      ? corporateAccreditedInvestor
      : individualAccreditedInvestor
    agreementsMap = isCorporate
      ? corporateInvestorAgreementsMap
      : individualInvestorAgreementsMap
  } else {
    agreementsData = expertInvestor
    agreementsMap = expertInvestorAgreementsMap
  }
  //   }

  return (
    <CorporateDeclarationsList
      title={'Investor Role Declaration'}
      subtitle={`I declare that I am an ${role} Investor`}
      data={agreementsData}
      type={investorRole === 'expert' ? 'radio' : 'checkbox'}
      labelMap={agreementsMap}
    />
  )
}
