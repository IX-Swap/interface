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
import { Element } from 'react-scroll'

export enum CorporateKYCSections {
  'Corporate Information' = 'corporate-information',
  'Ownership Structure Layers' = 'ownership-structure-layers',
  'Registered & Mailing Address' = 'registered-mailing-address',
  'Company Authorized Personnel' = 'company-authorized-personnel',
  'Tax Information' = 'tax-information',
  'Directors/Partners/People with Executive Authority' = 'directors',
  'Beneficial Owners Information' = 'beneficial-owners-information'
}

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
        <Element name={CorporateKYCSections['Corporate Information']}>
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
        </Element>
      </Grid>

      <Grid item>
        <Element name={CorporateKYCSections['Ownership Structure Layers']}>
          <FieldContainer>
            <Grid container direction='column' spacing={5}>
              <Grid item>
                <FormSectionHeader title='Ownership Structure Layers' />
              </Grid>

              <OwnershipStructure data={data} />
            </Grid>
          </FieldContainer>
        </Element>
      </Grid>

      <Grid item>
        <Element name={CorporateKYCSections['Registered & Mailing Address']}>
          <CorporateAddress data={data} />
        </Element>
      </Grid>

      <Grid item>
        <Element name={CorporateKYCSections['Company Authorized Personnel']}>
          <PersonnelList personnel={data.representatives ?? []} />
        </Element>
      </Grid>

      <Grid item>
        <Element name={CorporateKYCSections['Tax Information']}>
          <CountryTaxDeclaration taxResidencies={data.taxResidencies} />
        </Element>
      </Grid>

      <Grid item>
        <Element
          name={
            CorporateKYCSections[
              'Directors/Partners/People with Executive Authority'
            ]
          }
        >
          <DirectorList data={data} />
        </Element>
      </Grid>

      <Grid item>
        <Element name={CorporateKYCSections['Beneficial Owners Information']}>
          <BeneficialOwnersList data={data} />
        </Element>
      </Grid>
    </Grid>
  )
}
