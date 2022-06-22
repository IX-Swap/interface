import { Grid, Paper } from '@mui/material'
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
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { OwnershipStructure } from 'app/pages/identity/components/CorporateIdentityView/OwnershipStructure'
import { DirectorList } from 'app/pages/identity/components/CorporateIdentityView/DirectorList'

export interface CorporateIdentityViewProps {
  data: CorporateIdentity
}

export const CorporateIdentityView = ({ data }: CorporateIdentityViewProps) => {
  console.log('data', data)

  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <FieldContainer>
          <Grid container direction='column' spacing={5}>
            <Grid item>
              <FormSectionHeader title='Corporate Information' />
            </Grid>

            <CorporateInfo data={data} />
          </Grid>
        </FieldContainer>
      </Grid>

      <Grid item>
        <FieldContainer>
          <Grid container direction='column' spacing={5}>
            <Grid item>
              <FormSectionHeader title='Ownership Structure Layers' />
            </Grid>

            <OwnershipStructure data={data} />
          </Grid>
        </FieldContainer>
      </Grid>

      <Grid item>
        <CorporateAddress data={data} />
      </Grid>

      <Grid item>
        <PersonnelList personnel={data.representatives ?? []} />
      </Grid>

      <Grid item>
        <DirectorList data={data} />
      </Grid>

      <Grid item>
        <BeneficialOwnersList data={data} />
      </Grid>

      <Grid item>
        <CountryTaxDeclaration taxResidencies={data.taxResidencies} />
      </Grid>

      <Grid item>
        <FieldContainer>
          <FormSectionHeader title='Investor Declaration' />
          <InvestorDeclarationView identityType='corporate' data={data} />
        </FieldContainer>
      </Grid>

      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <FormSectionHeader title='Company Documents' />
          <IdentityDocumentsView data={data.documents} type='corporate' />
        </Paper>
      </Grid>
    </Grid>
  )
}
