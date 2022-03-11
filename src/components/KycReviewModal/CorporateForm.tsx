import React from 'react'

import { CorporateKyc } from 'state/admin/actions'

import { Cynopsis } from './Blocks/Cynopsis'
import { Information } from './Blocks/Information'
import { CompanyAuthorizedPersonnel } from './Blocks/CompanyAuthorizedPersonnel'
import { Address } from './Blocks/Address'
import { ResidentialAddress } from './Blocks/ResidentialAddress'
import { SourceOfFunds } from './Blocks/SourceOfFunds'
import { InvestorStatusDeclaration } from './Blocks/InvestorStatusDeclaration'
import { Fatca } from './Blocks/Fatca'
import { OptInRequirement } from './Blocks/OptInRequirement'
import { TaxDeclaration } from './Blocks/TaxDeclaration'
import { BeneficialOwners } from './Blocks/BeneficialOwners'
import { UploadDocuments } from './Blocks/UploadDocuments'

interface Props {
  data: CorporateKyc
}

export const CorporateForm = ({ data }: Props) => {
  return (
    <>
      <Cynopsis />
      <Information data={data} kycKey="corporate" />
      <CompanyAuthorizedPersonnel data={data} />
      <Address data={data} />
      <ResidentialAddress data={data.residentialAddress} />
      <SourceOfFunds data={data} kycKey="corporate" />
      <InvestorStatusDeclaration data={data} kycKey="corporate" />
      <Fatca data={data} />
      <OptInRequirement />
      <TaxDeclaration data={data} />
      <BeneficialOwners owners={data.beneficialOwners} />
      <UploadDocuments data={data.documents} />
    </>
  )
}
