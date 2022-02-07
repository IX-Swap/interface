import { Grid } from '@mui/material'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { PersonnelList } from 'app/pages/identity/components/CorporateIdentityView/PersonnelList'
import { BeneficialOwnersList } from 'app/pages/identity/components/CorporateIdentityView/BeneficialOwnersList'
import { CorporateAddress } from 'app/pages/identity/components/CorporateIdentityView/CorporateAddress'
import { CorporateInfo } from 'app/pages/identity/components/CorporateIdentityView/CorporateInfo'
import React from 'react'
import { IdentityDocumentsView } from 'app/pages/identity/components/IdentityDocumentsView/IdentityDocumentsView'
import { CountryTaxDeclaration } from 'app/pages/identity/components/CountryTaxDeclarations/CountryTaxDeclaration'
import { InvestorDeclarationView } from 'app/pages/identity/components/IndividualIdentityView/InvestorDeclarationView/InvestorDeclarationView'
import { CorporateIdentity } from 'app/pages/identity/types/forms'

export interface CorporateIdentityViewProps {
  data: CorporateIdentity
}

export const CorporateIdentityView = ({ data }: CorporateIdentityViewProps) => {
  return (
    <Grid container spacing={6} direction='column'>
      <Grid item style={{ paddingBottom: 0 }}>
        <FormSectionHeader title='Overview' />
        <CorporateInfo data={data} />
      </Grid>
      <Grid item>
        <FormSectionHeader title='Address' />
        <CorporateAddress
          registeredAddress={data.companyAddress}
          mailingAddress={data.mailingAddress}
        />
      </Grid>
      <Grid item>
        <FormSectionHeader title='Company Authorized Personnel' />
        <PersonnelList
          personnel={data.representatives ?? []}
          documentsTitle='Authorization Documents'
        />
      </Grid>
      <Grid item>
        <FormSectionHeader title='Directors/Partners/People with Executive Authority' />
        <PersonnelList personnel={data.directors ?? []} showDocumentHeader />
      </Grid>
      <Grid item style={{ paddingBottom: 0, paddingTop: 0 }}>
        <FormSectionHeader title='Beneficial Owners Information' />
        <BeneficialOwnersList
          personnel={data.beneficialOwners ?? []}
          showDocumentHeader
        />
      </Grid>
      <Grid item>
        <FormSectionHeader title='Investor Declaration' />
        <InvestorDeclarationView identityType='corporate' data={data} />
      </Grid>
      <Grid item>
        <FormSectionHeader title='Tax Declaration' />
        <CountryTaxDeclaration taxResidencies={data.taxResidencies} />
      </Grid>
      <Grid item>
        <FormSectionHeader title='Company Documents' />
        <IdentityDocumentsView data={data.documents} type='corporate' />
      </Grid>
    </Grid>
  )
}
