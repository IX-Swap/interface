import React from 'react'
import { Grid } from '@mui/material'
import { privateClassNames } from 'helpers/classnames'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { IndividualInfoView } from './IndividualInfoView/IndividualInfoView'
import { AddressView } from './AddressView/AddressView'
import { IndividualIdentity } from '../../types/forms'
import { CountryTaxDeclaration } from 'app/pages/identity/components/CountryTaxDeclarations/CountryTaxDeclaration'
import { FatcaView } from '../IndividualIdentityView/FatcaView/FatcaViewView'
import { FinancialView } from '../IndividualIdentityView/FinancialView/FinancialView'
import { NoticeOfAssessmentView } from '../IndividualIdentityView/NoticeOfAssessment/NoticeOfAssessmentView'
import { Element } from 'react-scroll'
import { ProofOfAddress } from '../IdentityDocumentsView/ProofOfAddress'
import { ProofOfIdentity } from '../IdentityDocumentsView/ProofOfIdentity'

export enum IndividualKYCSections {
  'Personal Information' = 'personal-information',
  'Proof of Identity' = 'proof-of-identity',
  'Address' = 'address',
  'Proof of Address' = 'proof-of-address',
  'Financial Information' = 'financial-information',
  'Tax Information' = 'tax-information',
  'FATCA' = 'fatca'
}

export interface IndividualIdentityViewProps {
  data: IndividualIdentity
  hideAvatar?: boolean
  showReview?: boolean
}

export const IndividualIdentityView = ({
  data,
  hideAvatar = false,
  showReview = false
}: IndividualIdentityViewProps) => {
  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <Element name={IndividualKYCSections['Personal Information']}>
          <FieldContainer>
            <Grid container direction={'column'} spacing={5}>
              {showReview && (
                <Grid item>
                  <FormSectionHeader
                    title='Review Responses'
                    hasBottomBorder={true}
                  />
                </Grid>
              )}

              <Grid item>
                <FormSectionHeader title='Personal Information' />
              </Grid>

              <IndividualInfoView data={data} hideAvatar={hideAvatar} />
            </Grid>
          </FieldContainer>
        </Element>
      </Grid>

      <Grid item>
        <Element name={IndividualKYCSections['Proof of Identity']}>
          <ProofOfIdentity data={data.documents} type='individual' />
        </Element>
      </Grid>

      <Grid item className={privateClassNames()} mt={-2}>
        <Element name={IndividualKYCSections.Address}>
          <FieldContainer>
            <Grid item container direction={'column'} spacing={5}>
              <Grid item>
                <FormSectionHeader title='Address' />
              </Grid>
              <Grid item>
                <AddressView data={data.address} />
              </Grid>
            </Grid>
          </FieldContainer>
        </Element>
      </Grid>

      <Grid item>
        <Element name={IndividualKYCSections['Proof of Address']}>
          <ProofOfAddress data={data.documents} type='individual' />
        </Element>
      </Grid>

      <Grid item className={privateClassNames()}>
        <Element name={IndividualKYCSections['Financial Information']}>
          <FieldContainer>
            <Grid item container direction={'column'} spacing={5}>
              <Grid item>
                <FormSectionHeader title='Financial Information' />
              </Grid>
              <Grid item>
                <FinancialView data={data} />
              </Grid>
            </Grid>
          </FieldContainer>
        </Element>
      </Grid>

      <NoticeOfAssessmentView />

      <Grid item className={privateClassNames()}>
        <Element name={IndividualKYCSections['Tax Information']}>
          <CountryTaxDeclaration taxResidencies={data.taxResidencies} />
        </Element>
      </Grid>

      <Grid item>
        <Element name={IndividualKYCSections.FATCA}>
          <FatcaView data={data} />
        </Element>
      </Grid>
    </Grid>
  )
}
