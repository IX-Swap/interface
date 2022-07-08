import React from 'react'
import { Grid } from '@mui/material'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { PersonnelList } from 'app/pages/identity/components/CorporateIdentityView/PersonnelList'
import { BeneficialOwnersList } from 'app/pages/identity/components/CorporateIdentityView/BeneficialOwnersList'
import { CorporateAddress } from 'app/pages/identity/components/CorporateIdentityView/CorporateAddress'
import { CorporateInfo } from 'app/pages/identity/components/CorporateIdentityView/CorporateInfo'
import { CountryTaxDeclaration } from 'app/pages/identity/components/CountryTaxDeclarations/CountryTaxDeclaration'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { OwnershipStructure } from 'app/pages/identity/components/CorporateIdentityView/OwnershipStructure'
import { DirectorList } from 'app/pages/identity/components/CorporateIdentityView/DirectorList'
import { InvestorDeclarationView } from 'app/pages/identity/components/CorporateIdentityView/InvestorDeclarationView'
import { OptInView } from 'app/pages/identity/components/CorporateIdentityView/OptInView'
import { DocumentsView } from 'app/pages/identity/components/CorporateIdentityView/DocumentsView'
import { InstitutionalInvestorDeclarationView } from 'app/pages/identity/components/CorporateIdentityView/InstitutionalInvestorDeclarationView'

export interface CorporateIdentityViewProps {
  data: CorporateIdentity
  isIssuer?: boolean
}

export const CorporateIdentityView = ({ data }: CorporateIdentityViewProps) => {
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
        <InvestorDeclarationView data={data} />
      </Grid>

      <Grid item>
        <OptInView data={data} />
      </Grid>

      <Grid item>
        <InstitutionalInvestorDeclarationView data={data} />
      </Grid>

      <Grid item>
        <DocumentsView data={data.documents} />
      </Grid>
    </Grid>
  )
}
