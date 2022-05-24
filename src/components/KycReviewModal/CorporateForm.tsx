import React from 'react'

import { CorporateKyc } from 'state/admin/actions'

// import { OptInRequirement } from './Blocks/OptInRequirement'

import {
  Cynopsis,
  Information,
  CompanyAuthorizedPersonnel,
  Address,
  ResidentialAddress,
  SourceOfFunds,
  InvestorStatusDeclaration,
  Fatca,
  TaxDeclaration,
  BeneficialOwners,
  UploadedDocuments,
} from './Blocks'

interface Props {
  data: CorporateKyc
  riskJSON: any
}

export const CorporateForm = ({ data, riskJSON }: Props) => {
  return (
    <>
      <Cynopsis riskJSON={riskJSON} />
      <Information data={data} kycKey="corporate" />
      <CompanyAuthorizedPersonnel data={data} />
      <Address data={data} />
      <ResidentialAddress data={data.residentialAddress} />
      <SourceOfFunds data={data} kycKey="corporate" />
      <InvestorStatusDeclaration data={data} kycKey="corporate" />
      <Fatca data={data} />
      {/* <OptInRequirement /> */}
      <TaxDeclaration data={data} />
      <BeneficialOwners owners={data.beneficialOwners} />
      <UploadedDocuments data={data.documents.filter(({ type }) => type !== 'authorization')} />
    </>
  )
}
