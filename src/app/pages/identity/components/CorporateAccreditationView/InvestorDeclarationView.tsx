import React from 'react'
import {
  corporateInvestorAgreementsMap,
  individualInvestorAgreementsMap,
  expertInvestorAgreementsMap
} from 'app/pages/identity/components/InvestorDeclarationForm/InvestorAgreements/agreements'
import { institutionalInvestorAgreementsMap } from 'app/pages/identity/components/InvestorDeclarationForm/InstitutionalInvestorAgreements/InstitutionalInvestorAgreements'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'
import { CorporateDeclarationsList } from 'app/pages/identity/components/CorporateIdentityView/CorporateDeclarationsList'
import { capitalizeFirstLetter } from 'helpers/strings'

export interface InvestorDeclarationViewProps {
  data: IndividualIdentity | CorporateIdentity
  isCorporate?: boolean
}

export const InvestorDeclarationView = ({
  data,
  isCorporate = true
}: InvestorDeclarationViewProps) => {
  const {
    applyingAs,
    isInstitutionalInvestor,
    isIntermediaryInvestor,
    declarations: {
      investorsStatus: {
        // assets,
        // trustee,
        // accreditedShareholders,
        // partnership,
        // accreditedBeneficiaries,
        // accreditedSettlors,
        // personalAssets,
        // income,
        // financialAsset,
        // jointlyHeldAccount,
        investorAgreement
      }
    }
  } = data

  //   const corporateAccreditedInvestor = {
  //     assets,
  //     trustee,
  //     accreditedShareholders,
  //     partnership,
  //     accreditedBeneficiaries,
  //     accreditedSettlors
  //   }

  //   const individualAccreditedInvestor = {
  //     personalAssets,
  //     income,
  //     financialAsset,
  //     jointlyHeldAccount
  //   }

  const expertInvestor = {
    investorAgreement
  }

  const institutionalInvestor = {
    isInstitutionalInvestor,
    isIntermediaryInvestor
  }

  const investorRole: string =
    typeof applyingAs !== 'undefined' && applyingAs.length > 0
      ? applyingAs[0]
      : 'accredited'

  // * Accredited Investor Agreements
  //   let agreementsData: Record<string, boolean | undefined> = isCorporate
  //     ? corporateAccreditedInvestor
  //     : individualAccreditedInvestor
  let agreementsData: Record<string, boolean | undefined> = expertInvestor
  let agreementsMap: Record<string, React.ReactNode> = isCorporate
    ? corporateInvestorAgreementsMap
    : individualInvestorAgreementsMap

  if (investorRole === 'expert') {
    agreementsData = expertInvestor
    agreementsMap = expertInvestorAgreementsMap
  } else if (investorRole === 'institutional') {
    agreementsData = institutionalInvestor
    agreementsMap = institutionalInvestorAgreementsMap
  }

  return (
    <CorporateDeclarationsList
      title={'Investor Role Declaration'}
      subtitle={`I declare that I am an ${capitalizeFirstLetter(
        investorRole
      )} Investor`}
      data={agreementsData}
      //   type={investorRole === 'expert' ? 'radio' : 'checkbox'}
      type={investorRole !== 'institutional' ? 'radio' : 'checkbox'}
      labelMap={agreementsMap}
    />
  )
}
