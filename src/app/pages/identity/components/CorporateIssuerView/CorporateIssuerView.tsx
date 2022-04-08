import React from 'react'
import { Grid, Paper } from '@mui/material'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { PersonnelList } from 'app/pages/identity/components/CorporateIdentityView/PersonnelList'
import { CorporateAddress } from 'app/pages/identity/components/CorporateIdentityView/CorporateAddress'
import { CorporateInfo } from 'app/pages/identity/components/CorporateIdentityView/CorporateInfo'
import { IdentityDocumentsView } from 'app/pages/identity/components/IdentityDocumentsView/IdentityDocumentsView'
import { CountryTaxDeclaration } from 'app/pages/identity/components/CountryTaxDeclarations/CountryTaxDeclaration'
import { AgreementsAndDisclosuresView } from 'app/pages/identity/components/IndividualIdentityView/AgreementsAndDisclosuresView/AgreementsAndDisclosuresView'
import { BeneficialOwnersList } from 'app/pages/identity/components/CorporateIdentityView/BeneficialOwnersList'
import { CorporateIdentity } from '../../types/forms'

export interface CorporateIssuerViewProps {
  data: CorporateIdentity
}

export const CorporateIssuerView = ({ data }: CorporateIssuerViewProps) => {
  return (
    <Grid container spacing={6} direction='column'>
      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <FormSectionHeader title='Overview' />
          <CorporateInfo data={data} />
        </Paper>
      </Grid>
      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <FormSectionHeader title='Address' />
          <CorporateAddress
            registeredAddress={data.companyAddress}
            mailingAddress={data.mailingAddress}
          />
        </Paper>
      </Grid>
      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <FormSectionHeader title='Company Authorized Personnel' />
          <PersonnelList
            personnel={data.representatives ?? []}
            documentsTitle='Authorization Documents'
          />
        </Paper>
      </Grid>
      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <FormSectionHeader title='Directors/Partners/People with Executive Authority' />
          <PersonnelList personnel={data.directors ?? []} showDocumentHeader />
        </Paper>
      </Grid>
      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <FormSectionHeader title='Beneficial Owners Information' />
          <BeneficialOwnersList
            personnel={data.beneficialOwners ?? []}
            showDocumentHeader
          />
        </Paper>
      </Grid>
      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <FormSectionHeader title='Tax Declaration' />
          <CountryTaxDeclaration taxResidencies={data.taxResidencies} />
        </Paper>
      </Grid>
      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <FormSectionHeader title='Company Documents' />
          <IdentityDocumentsView data={data.documents} type='corporate' />
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <FormSectionHeader title='Agreements and Disclosures' />
          <AgreementsAndDisclosuresView
            data={data}
            isCorporateIssuerForm={true}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}
