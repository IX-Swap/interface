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

interface Props {
  data: IndividualKyc
  riskJSON: any
}

export const IndividualForm = ({ data, riskJSON }: Props) => {
  const documents = data?.documents?.filter(document => {
    if (+data?.accredited === 0) {
      return document.type !== 'accreditation'
    }

    return document
  })

  return (
    <>
      <Cynopsis riskJSON={riskJSON} />

      <Information data={data} kycKey="individual" />
      <Address data={data} />
      <IndividualDocument data={data} />

      <Referral data={data} />

      <Occupation data={data} />
      <SourceOfFunds data={data} kycKey="individual" />
      <TaxDeclarations data={data} />
      <Fatca data={data} />

      <InvestorStatusDeclaration data={data} kycKey="individual" />
      <InvestorDeclaration data={data} />
      <UploadedDocuments data={documents} />
    </>
  )
}
