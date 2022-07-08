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
import { useAllCorporatesByUserId } from 'app/pages/admin/hooks/useAllCorporatesByUserId'
import { useParams } from 'react-router-dom'

export interface CorporateIdentityViewProps {
  isCorporateIssuerForm?: boolean
}

export const AdminCorporateIdentityView = ({
  isCorporateIssuerForm = false
}: CorporateIdentityViewProps) => {
  const { userId } = useParams<{ userId: string }>()
  const { data, isLoading } = useAllCorporatesByUserId({
    userId,
    type: isCorporateIssuerForm ? 'issuer' : 'investor'
  })
  const identity = data.list[0]

  if (isLoading) {
    return null
  }

  return (
    <Grid container spacing={6} direction='column'>
      <Grid item style={{ paddingBottom: 0 }}>
        <FormSectionHeader title='Overview' />
        <CorporateInfo data={identity} />
      </Grid>
      <Grid item>
        <FormSectionHeader title='Address' />
        <CorporateAddress data={identity} />
      </Grid>
      <Grid item>
        <FormSectionHeader title='Company Authorized Personnel' />
        <PersonnelList personnel={identity.representatives ?? []} />
      </Grid>
      <Grid item>
        <FormSectionHeader title='Directors/Partners/People with Executive Authority' />
        <PersonnelList personnel={identity.directors ?? []} />
      </Grid>
      <Grid item style={{ paddingBottom: 0, paddingTop: 0 }}>
        <FormSectionHeader title='Beneficial Owners Information' />
        <BeneficialOwnersList data={identity} />
      </Grid>
      <Grid item>
        <FormSectionHeader title='Tax Declaration' />
        <CountryTaxDeclaration taxResidencies={identity.taxResidencies} />
      </Grid>
      {!isCorporateIssuerForm ? (
        <Grid item>
          <FormSectionHeader title='Investor Status Declaration' />
          <InvestorDeclarationView data={identity} identityType='corporate' />
        </Grid>
      ) : null}
      <Grid item>
        <FormSectionHeader title='Company Documents' />
        <IdentityDocumentsView data={identity.documents} type='corporate' />
      </Grid>
    </Grid>
  )
}
