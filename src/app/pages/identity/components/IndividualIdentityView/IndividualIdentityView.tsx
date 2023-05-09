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
  // const classes = useStyles()
  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
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
      </Grid>

      <Grid item className={privateClassNames()}>
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
      </Grid>

      <Grid item className={privateClassNames()}>
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
      </Grid>

      <NoticeOfAssessmentView />

      <Grid item className={privateClassNames()}>
        <CountryTaxDeclaration taxResidencies={data.taxResidencies} />
      </Grid>

      <Grid item>
        <FatcaView data={data} />
      </Grid>
    </Grid>
  )
}
