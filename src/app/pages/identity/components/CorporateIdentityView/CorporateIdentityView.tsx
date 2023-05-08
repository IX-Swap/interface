import React from 'react'
import { Grid } from '@mui/material'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { PersonnelList } from 'app/pages/identity/components/CorporateIdentityView/PersonnelList'
import { BeneficialOwnersList } from 'app/pages/identity/components/CorporateIdentityView/BeneficialOwnersList'
import { CorporateAddress } from 'app/pages/identity/components/CorporateIdentityView/CorporateAddress'
import { CorporateInfo } from 'app/pages/identity/components/CorporateIdentityView/CorporateInfo'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { OwnershipStructure } from 'app/pages/identity/components/CorporateIdentityView/OwnershipStructure'
import { DirectorList } from 'app/pages/identity/components/CorporateIdentityView/DirectorList'
import { CountryTaxDeclaration } from 'app/pages/identity/components/CountryTaxDeclarations/CountryTaxDeclaration'

export interface CorporateIdentityViewProps {
  data: CorporateIdentity
  hideAvatar?: boolean
  showReview?: boolean
}

export const CorporateIdentityView = ({
  data,
  hideAvatar = false,
  showReview = false
}: CorporateIdentityViewProps) => {
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <FieldContainer>
          <Grid container direction='column' spacing={5}>
            {showReview && (
              <Grid item>
                <FormSectionHeader
                  title='Review Responses'
                  hasBottomBorder={true}
                />
              </Grid>
            )}
            <Grid item>
              <FormSectionHeader title='Corporate Information' />
            </Grid>

            <CorporateInfo data={data} hideAvatar={hideAvatar} />
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
        <CountryTaxDeclaration
          taxResidencies={data.taxResidencies}
          showReview={showReview}
        />
      </Grid>
    </Grid>
  )
}
