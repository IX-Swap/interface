import React from 'react'
import { Grid } from '@material-ui/core'
import { FormSectionHeader } from 'app/pages/_identity/components/FormSectionHeader'
import { PersonnelList } from 'app/pages/_identity/components/CorporateIdentityView/PersonnelList'
import { CorporateAddress } from 'app/pages/_identity/components/CorporateIdentityView/CorporateAddress'
import { CorporateInfo } from 'app/pages/_identity/components/CorporateIdentityView/CorporateInfo'
import { IdentityDocumentsView } from 'app/pages/_identity/components/IdentityDocumentsView/IdentityDocumentsView'
import { CountryTaxDeclaration } from 'app/pages/_identity/components/CountryTaxDeclarations/CountryTaxDeclaration'
import { AgreementsAndDisclosuresView } from 'app/pages/_identity/components/IndividualIdentityView/AgreementsAndDisclosuresView/AgreementsAndDisclosuresView'
import { BeneficialOwnersList } from 'app/pages/_identity/components/CorporateIdentityView/BeneficialOwnersList'
import { CorporateIdentity } from 'types/identity'
export interface CorporateIssuerViewProps {
  data: CorporateIdentity
}

export const CorporateIssuerView = ({ data }: CorporateIssuerViewProps) => {
  return (
    <Grid container spacing={6} direction='column'>
      <Grid item>
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
      <Grid item>
        <FormSectionHeader title='Beneficial Owners Information' />
        <BeneficialOwnersList
          personnel={data.beneficialOwners ?? []}
          showDocumentHeader
        />
      </Grid>
      <Grid item>
        <FormSectionHeader title='Tax Declaration' />
        <CountryTaxDeclaration taxResidencies={data.taxResidencies} />
      </Grid>
      <Grid item>
        <FormSectionHeader title='Company Documents' />
        <IdentityDocumentsView data={data.documents} type='corporate' />
      </Grid>
      <Grid item xs>
        <FormSectionHeader title='Agreements and Disclosures' />
        <AgreementsAndDisclosuresView
          data={data}
          isCorporateIssuerForm={true}
        />
      </Grid>
    </Grid>
  )
}
