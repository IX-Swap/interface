import { Grid } from '@material-ui/core'
import { FormSectionHeader } from 'app/pages/_identity/components/FormSectionHeader'
import { PersonnelList } from 'app/pages/_identity/components/CorporateIdentityView/PersonnelList'
import { BeneficialOwnersList } from 'app/pages/_identity/components/CorporateIdentityView/BeneficialOwnersList'
import { CorporateAddress } from 'app/pages/_identity/components/CorporateIdentityView/CorporateAddress'
import { CorporateInfo } from 'app/pages/_identity/components/CorporateIdentityView/CorporateInfo'
import React from 'react'
import { IdentityDocumentsView } from 'app/pages/_identity/components/IdentityDocumentsView/IdentityDocumentsView'
import { CountryTaxDeclaration } from 'app/pages/_identity/components/CountryTaxDeclarations/CountryTaxDeclaration'
import { InvestorDeclarationView } from 'app/pages/_identity/components/IndividualIdentityView/InvestorDeclarationView/InvestorDeclarationView'
import { useIdentitiesRouter } from 'app/pages/_identity/router'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'

export interface CorporateIdentityViewProps {
  isCorporateIssuerForm?: boolean
}

export const CorporateIdentityView = ({
  isCorporateIssuerForm = false
}: CorporateIdentityViewProps) => {
  const { params } = useIdentitiesRouter()
  const {
    data: { map },
    isLoading
  } = useAllCorporates({})
  const data = map[params.identityId]

  if (isLoading || data === undefined) {
    return null
  }

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
        <FormSectionHeader title='Tax Declaration' />
        <CountryTaxDeclaration taxResidencies={data.taxResidencies} />
      </Grid>
      {!isCorporateIssuerForm ? (
        <Grid item>
          <FormSectionHeader title='Investor Status Declaration' />
          <InvestorDeclarationView data={data} identityType='corporate' />
        </Grid>
      ) : null}
      <Grid item>
        <FormSectionHeader title='Company Documents' />
        <IdentityDocumentsView data={data.documents} type='corporate' />
      </Grid>
    </Grid>
  )
}
