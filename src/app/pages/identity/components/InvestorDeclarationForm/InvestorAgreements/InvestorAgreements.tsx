import {
  corporateInvestorAgreementsMap,
  individualInvestorAgreementsMap,
  expertInvestorAgreementsMap
} from 'app/pages/identity/components/InvestorDeclarationForm/InvestorAgreements/agreements'
import { DeclarationsListFields } from 'app/pages/identity/components/InvestorDeclarationForm/DeclarationsList/DeclartionsListFields'
import React from 'react'
import { IdentityType, InvestorRole } from 'app/pages/identity/utils/shared'
import { institutionalInvestorAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/InstitutionalInvestorAgreements/InstitutionalInvestorAgreements'

export interface InvestorAgreementsProps {
  type: IdentityType
  role: InvestorRole
}

export const InvestorAgreements = ({ type, role }: InvestorAgreementsProps) => {
  const isCorporate = type === 'corporate'
  let agreements

  if (role === 'institutional') {
    agreements = institutionalInvestorAgreements
  } else {
    if (role === 'accredited') {
      agreements = isCorporate
        ? corporateInvestorAgreementsMap
        : individualInvestorAgreementsMap
    } else {
      agreements = expertInvestorAgreementsMap
    }

    agreements = Object.entries(agreements).map(([name, label]) => ({
      name,
      label
    }))
  }

  return (
    <DeclarationsListFields
      data={agreements}
      type={role === 'expert' ? 'radio' : 'checkbox'}
    />
  )
}
