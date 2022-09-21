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

interface Props {
  data: IndividualKyc
  riskJSON: any
}

export const IndividualForm = ({ data, riskJSON }: Props) => {
  return (
    <>
      <Cynopsis riskJSON={riskJSON} />

      <Information data={data} kycKey="individual" />
      <Address data={data} />
      <IndividualDocument data={data} />

      <Occupation data={data} />
      <SourceOfFunds data={data} kycKey="individual" />
      <TaxDeclarations data={data} />
      <Fatca data={data} />

      <InvestorStatusDeclaration data={data} kycKey="individual" />
      <InvestorDeclaration data={data} />
      <UploadedDocuments data={data.documents} />
    </>
  )
}
