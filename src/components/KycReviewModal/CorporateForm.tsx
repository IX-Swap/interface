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
  CorporateMembers,
} from './Blocks'
import { Line } from 'components/Line'

interface Props {
  data: CorporateKyc
  riskJSON: any
}

export const CorporateForm = ({ data, riskJSON }: Props) => {
  return (
    <>
      <Cynopsis riskJSON={riskJSON} />
      <Line />
      <Information data={data} kycKey="corporate" />
      <Line />
      <CompanyAuthorizedPersonnel data={data} />
      <Line />
      <Address data={data} />
      <Line />
      <ResidentialAddress data={data.residentialAddress} />
      <Line />
      <SourceOfFunds data={data} kycKey="corporate" />
      <Line />
      <InvestorStatusDeclaration data={data} kycKey="corporate" />
      <Line />
      <Fatca data={data} />
      <Line />
      {/* <OptInRequirement /> */}
      <TaxDeclaration data={data} />
      <Line />
      <BeneficialOwners owners={data.beneficialOwners} />
      <CorporateMembers owners={data.corporateMembers} />
      <Line />
      <UploadedDocuments title="Corporate Documents" data={data.documents.filter(({ type }) => type === 'corporate')} />
      <UploadedDocuments title="Additional Documents" data={data.documents.filter(({ type }) => type === 'financial')} />
    </>
  )
}
