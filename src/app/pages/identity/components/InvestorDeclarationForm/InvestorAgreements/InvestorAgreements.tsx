import {
  corporateInvestorAgreementsMap,
  individualInvestorAgreementsMap
} from 'app/pages/identity/components/InvestorDeclarationForm/InvestorAgreements/agreements'
import { DeclarationsListFields } from 'app/pages/identity/components/InvestorDeclarationForm/DeclarationsList/DeclartionsListFields'
import React from 'react'
import { IdentityType } from 'app/pages/identity/utils/shared'

export interface InvestorAgreementsProps {
  type: IdentityType
}

export const InvestorAgreements = ({ type }: InvestorAgreementsProps) => {
  const isCorporate = type === 'corporate'
  const agreements = isCorporate
    ? corporateInvestorAgreementsMap
    : individualInvestorAgreementsMap

  return (
    <DeclarationsListFields
      data={Object.entries(agreements).map(([name, label]) => ({
        name,
        label
      }))}
    />
  )
}
