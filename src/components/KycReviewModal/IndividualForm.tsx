import React from 'react'

import { IndividualKyc } from 'state/admin/actions'

import {
  IndividualDocument,
  Cynopsis,
  Information,
  Address,
  SourceOfFunds,
  Fatca,
  UploadedDocuments,
  Occupation,
  InvestorStatusDeclaration,
  TaxDeclarations,
  InvestorDeclaration,
} from './Blocks'

import { Referral } from './Blocks/Referral'
import { Line } from 'components/Line'

interface Props {
  data: IndividualKyc | undefined // Make sure data is optional
  riskJSON: any
}

const sections = [
  { component: Cynopsis },
  { component: Information, kycKey: 'individual' },
  { component: Address },
  // { component: Referral },
  { component: IndividualDocument },
  { component: UploadedDocuments, dataKey: 'documents' },
  { component: Occupation },
  { component: SourceOfFunds, kycKey: 'individual' },
  { component: TaxDeclarations },
  { component: Fatca },
  { component: InvestorStatusDeclaration, kycKey: 'individual' },
  { component: InvestorDeclaration },
]

export const IndividualForm = ({ data, riskJSON }: Props) => {
  const filteredDocuments = data?.documents?.filter((document) => {
    if (data && +data.accredited === 0) {
      return document?.type !== 'accreditation' // Use optional chaining for document
    }
    return document
  })

  return (
    <>
      {sections.map((section, index) => (
        <React.Fragment key={index}>
          <section.component title='Upload Documents' data={section.dataKey ? data?.[section.dataKey] : data} kycKey={section.kycKey} />
          {index < sections.length - 1 && <Line />}
        </React.Fragment>
      ))}
    </>
  )
}
