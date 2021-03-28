import { IdentityType } from 'app/pages/identity/utils'
import {
  corporateInvestorAgreementsMap,
  individualInvestorAgreementsMap
} from 'app/pages/_identity/components/InvestorDeclarationForm/InvestorAgreements/agreements'
import { DeclarationsListFields } from 'app/pages/_identity/components/InvestorDeclarationForm/DeclarationsList/DeclartionsListFields'
import React from 'react'

export interface InvestorAgreementsProps {
  type: IdentityType
}

export const InvestorAgreements = ({ type }: InvestorAgreementsProps) => {
  const isCorporate = type === 'corporate'
  const title = `I declare that I am ${
    isCorporate ? 'corporate' : 'individual'
  } "Accredited Investor"`
  const agreements = isCorporate
    ? corporateInvestorAgreementsMap
    : individualInvestorAgreementsMap

  return (
    <DeclarationsListFields
      title={title}
      data={Object.entries(agreements).map(([name, label]) => ({
        name,
        label
      }))}
    />
  )
}
