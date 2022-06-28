import React from 'react'
import { corporateInvestorAgreementsMap } from 'app/pages/identity/components/InvestorDeclarationForm/InvestorAgreements/agreements'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'
import { CorporateDeclarationsList } from 'app/pages/identity/components/CorporateIdentityView/CorporateDeclarationsList'

export interface CorporateInvestorDeclarationViewProps {
  data: IndividualIdentity | CorporateIdentity
}

export const CorporateInvestorDeclarationView: React.FC<
  CorporateInvestorDeclarationViewProps
> = ({ data }) => {
  const {
    assets,
    trustee,
    accreditedShareholders,
    partnership,
    accreditedBeneficiaries,
    accreditedSettlors
  } = data.declarations?.investorsStatus ?? {}

  const corporateInvestorDeclaration = {
    assets,
    trustee,
    accreditedShareholders,
    partnership,
    accreditedBeneficiaries,
    accreditedSettlors
  }

  return (
    <CorporateDeclarationsList
      title={'Investor Status Declaration'}
      subtitle='I declare that I am "Corporate Accredited Investor"'
      data={corporateInvestorDeclaration}
      labelMap={corporateInvestorAgreementsMap}
    />
  )
}
