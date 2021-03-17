import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { FormSectionHeader } from 'app/pages/_identity/components/FormSectionHeader'
import { DeclarationsListFields } from 'app/pages/_identity/components/InvestorDeclarationForm/DeclarationsList/DeclartionsListFields'
import { IdentityType } from 'app/pages/identity/utils'
import { OptInAgreements } from 'app/pages/_identity/components/InvestorDeclarationForm/OptInAgreements/OptInAgreements'
import { InvestorAgreements } from 'app/pages/_identity/components/InvestorDeclarationForm/InvestorAgreements/InvestorAgreements'

export interface InvestorDeclarationFormProps {
  identityType?: IdentityType
}

export const InvestorDeclarationForm = ({
  identityType = 'individual'
}: InvestorDeclarationFormProps) => {
  return (
    <>
      <FormSectionHeader title='Investor Status Declaration' />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>
            Singapore rules require you to declare your investor status before
            you see live deals on our platform
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <InvestorAgreements type={identityType} />
        </Grid>

        <Grid item xs={12}>
          <FormSectionHeader title={'Opt-In Requirement'} />
          <DeclarationsListFields
            title='I confirm to be treated as an “Accredited Investor” by InvestaX'
            data={[
              {
                name: 'optInAgreements',
                label: <OptInAgreements showOptOutDialog />
              }
            ]}
          />
        </Grid>
      </Grid>
    </>
  )
}
