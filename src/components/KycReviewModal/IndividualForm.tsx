import React from 'react'

import { CorporateKyc, IndividualKyc } from 'state/admin/actions'

import {
  IndividualDocument,
  Cynopsis,
  Information,
  Address,
  SourceOfFunds,
  UploadedDocuments,
  Occupation,
  InvestorStatusDeclaration,
  TaxDeclarations,
  InvestorDeclaration,
} from './Blocks'

import { Referral } from './Blocks/Referral'
import { Line } from 'components/Line'
import SecondaryContactDetails from './Blocks/SecondaryContactDetails'

interface Props {
  data: IndividualKyc | CorporateKyc | undefined // Make sure data is optional
}

export const IndividualForm = ({ data }: Props) => {
  const sections = [
    { component: Cynopsis },
    { component: Information, kycKey: 'individual' },
    { component: Address },
    // { component: Referral },
    { component: IndividualDocument },
    { component: UploadedDocuments, dataKey: 'documents', kycKey: 'individual' },
    { component: SecondaryContactDetails },
    { component: Occupation },
    { component: SourceOfFunds, kycKey: 'individual' },
    { component: TaxDeclarations },
    // { component: Fatca },
    { component: InvestorStatusDeclaration, kycKey: 'individual' },
    { component: InvestorDeclaration },
  ]

  return (
    <>
      {sections.map((section, index) => (
        <React.Fragment key={index}>
          <section.component
            title="Upload Documents"
            data={section.dataKey ? data?.[section.dataKey] : data}
            kycKey={section.kycKey}
          />
          {index < sections.length - 1 && section.component.name !== 'SecondaryContactDetails' && <Line />}
        </React.Fragment>
      ))}
    </>
  )
}
