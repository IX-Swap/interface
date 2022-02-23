import React from 'react'

import { IndividualKyc } from 'state/admin/actions'

import { Cynopsis } from './Blocks/Cynopsis'
import { Information } from './Blocks/Information'
import { Address } from './Blocks/Address'
import { SourceOfFunds } from './Blocks/SourceOfFunds'
import { Fatca } from './Blocks/Fatca'
import { UploadDocuments } from './Blocks/UploadDocuments'
import { Occupation } from './Blocks/Occupation'
import { InvestorStatusDeclaration } from './Blocks/InvestorStatusDeclaration'

interface Props {
  data: IndividualKyc
}

export const IndividualForm = ({ data }: Props) => {
  return (
    <>
      <Cynopsis />
      <Information data={data} kycKey="individual" />
      <Address data={data} />
      <SourceOfFunds data={data} kycKey="individual" />
      <InvestorStatusDeclaration data={data} kycKey="individual" />
      <Fatca data={data} />
      <Occupation data={data} />
      <UploadDocuments data={data.documents} />
    </>
  )
}
