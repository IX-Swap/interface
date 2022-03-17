import React from 'react'

import { IndividualKyc } from 'state/admin/actions'

import { Cynopsis } from './Blocks/Cynopsis'
import { Information } from './Blocks/Information'
import { Address } from './Blocks/Address'
import { SourceOfFunds } from './Blocks/SourceOfFunds'
import { Fatca } from './Blocks/Fatca'
import { UploadedDocuments } from './Blocks/UploadedDocuments'
import { Occupation } from './Blocks/Occupation'
import { InvestorStatusDeclaration } from './Blocks/InvestorStatusDeclaration'

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
      <SourceOfFunds data={data} kycKey="individual" />
      <InvestorStatusDeclaration data={data} kycKey="individual" />
      <Fatca data={data} />
      <Occupation data={data} />
      <UploadedDocuments data={data.documents} />
    </>
  )
}
