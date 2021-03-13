import { Grid } from '@material-ui/core'
import { FormSectionHeader } from 'app/pages/_identity/components/FormSectionHeader'
import { PersonnelList } from 'app/pages/_identity/components/CorporateIdentityView/PersonnelList'
import { CorporateAddress } from 'app/pages/_identity/components/CorporateIdentityView/CorporateAddress'
import { CorporateInfo } from 'app/pages/_identity/components/CorporateIdentityView/CorporateInfo'
import React from 'react'
import { IdentityDocumentsView } from 'app/pages/_identity/components/IdentityDocumentsView/IdentityDocumentsView'
import { CountryTaxDeclaration } from 'app/pages/_identity/components/CountryTaxDeclarations/CountryTaxDeclaration'
import { InvestorDeclarationView } from 'app/pages/_identity/components/IndividualIdentityView/InvestorDeclarationView/InvestorDeclarationView'
import { useIdentitiesRouter } from 'app/pages/_identity/router'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'

export const CorporateIssuerView = () => {
  const { params } = useIdentitiesRouter()
  const {
    data: { map },
    isLoading
  } = useAllCorporates({})
  const data = map[params.identityId as string]

  if (isLoading || data === undefined) {
    return null
  }

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
          personnels={data.representatives ?? []}
          documentsTitle='Authorization Documents'
        />
      </Grid>
      <Grid item>
        <FormSectionHeader title='Directors/Partners/People with Executive Authority' />
        <PersonnelList personnels={data.directors ?? []} showDocumentHeader />
      </Grid>
      <Grid item>
        <FormSectionHeader title='Beneficial Owners Information' />
        <PersonnelList
          personnels={data.beneficialOwners ?? []}
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
    </Grid>
  )
}
