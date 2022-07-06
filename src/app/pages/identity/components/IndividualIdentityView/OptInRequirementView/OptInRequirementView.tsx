import React from 'react'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { DeclarationsList } from 'app/pages/identity/components/DeclarationsList/DeclarationsList'
import { SafeguardAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/SafeguardsAgreements/SafeguardAgreements'
import { OptInAgreementsIndividual } from 'app/pages/identity/components/InvestorDeclarationForm/OptInAgreements/OptInAgreements'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { Grid, Typography } from '@mui/material'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { DeclarationsListItem } from 'app/pages/identity/components/DeclarationsListItem/DeclarationsListItem'

export interface OptInRequirementViewProps {
  data: IndividualIdentity
}

export const OptInRequirementView = ({ data }: OptInRequirementViewProps) => {
  const optInAgreementsSafeguards =
    data.declarations.investorsStatus.optInAgreementsSafeguards
  const optInAgreementsOptOut =
    data.declarations.investorsStatus.optInAgreementsOptOut
  const isOptInRequirementEmpty =
    !optInAgreementsSafeguards && !optInAgreementsOptOut

  const renderNoOneValuesComponent = () => {
    return (
      <Grid item container direction={'column'} spacing={2}>
        <DeclarationsListItem label={<SafeguardAgreements />} value={false} />
        <DeclarationsListItem
          label={<OptInAgreementsIndividual />}
          value={false}
        />
      </Grid>
    )
  }

  return (
    <FieldContainer>
      <Grid container direction={'column'}>
        <Grid item container direction={'column'} spacing={3}>
          <Grid item>
            <FormSectionHeader title='Opt-In Requirement' />
          </Grid>
          <Grid item>
            <Typography fontWeight={500} variant={'subtitle1'}>
              I confirm to be treated as an “Accredited Investor” by InvestaX
            </Typography>
          </Grid>

          {isOptInRequirementEmpty && renderNoOneValuesComponent()}
        </Grid>

        <Grid item>
          {!isOptInRequirementEmpty && (
            <DeclarationsList
              title={''}
              data={{
                optInAgreementsSafeguards,
                optInAgreementsOptOut
              }}
              labelMap={{
                optInAgreementsSafeguards: <SafeguardAgreements />,
                optInAgreementsOptOut: <OptInAgreementsIndividual />
              }}
            />
          )}
        </Grid>
      </Grid>
    </FieldContainer>
  )
}
