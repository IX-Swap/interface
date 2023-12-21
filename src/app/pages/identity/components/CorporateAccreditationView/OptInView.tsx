import React from 'react'
import { Grid, Typography } from '@mui/material'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { SafeguardAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/SafeguardsAgreements/SafeguardAgreements'
import { OptInAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/OptInAgreements/OptInAgreements'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'
import { DeclarationsListItem } from 'app/pages/identity/components/DeclarationsListItem/DeclarationsListItem'
import { capitalizeFirstLetter } from 'helpers/strings'
import { ExchangeAgreements } from '../InvestorDeclarationForm/ExchangeAgreements/ExchangeAgreements'

export interface OptInViewProps {
  data: IndividualIdentity | CorporateIdentity
}

export const OptInView: React.FC<OptInViewProps> = ({ data }) => {
  const { applyingAs } = data

  const investorRole = capitalizeFirstLetter(
    applyingAs?.length > 0 ? applyingAs[0] : 'accredited'
  )

  return (
    <FieldContainer>
      <Grid container direction={'column'}>
        <Grid item container direction={'column'} spacing={3}>
          <Grid item>
            <FormSectionHeader title='Opt-In Requirement' />
          </Grid>
          <Grid item>
            <Typography fontWeight={500} variant={'subtitle1'}>
              {`I confirm to be treated as an “${investorRole} Investor” by InvestaX`}
            </Typography>
          </Grid>

          <Grid item container direction={'column'} spacing={2}>
            <DeclarationsListItem
              label={<SafeguardAgreements investorRole={investorRole} />}
              value={
                data?.declarations?.investorsStatus?.optInAgreementsSafeguards
              }
            />
            {investorRole === 'Accredited' && (
              <DeclarationsListItem
                label={<OptInAgreements investorRole={investorRole} />}
                value={
                  data?.declarations?.investorsStatus?.optInAgreementsOptOut
                }
              />
            )}
            <DeclarationsListItem
              label={<ExchangeAgreements investorRole={investorRole} />}
              value={
                data?.declarations?.investorsStatus?.optInAgreementsExchange
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </FieldContainer>
  )
}
