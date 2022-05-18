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
      <IndividualDocument data={data} />
      <Address data={data} />
      <SourceOfFunds data={data} kycKey="individual" />
      <InvestorStatusDeclaration data={data} kycKey="individual" />
      <Fatca data={data} />
      <Occupation data={data} />
      <UploadedDocuments data={data.documents} />
    </>
  )
}
