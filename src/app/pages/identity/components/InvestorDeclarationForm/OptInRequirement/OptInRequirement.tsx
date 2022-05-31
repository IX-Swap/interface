import { Typography, Box } from '@mui/material'
import React, { Fragment } from 'react'
import { DeclarationsListFields } from 'app/pages/identity/components/InvestorDeclarationForm/DeclarationsList/DeclartionsListFields'
import { OptInAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/OptInAgreements/OptInAgreements'
import { SafeguardAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/SafeguardsAgreements/SafeguardAgreements'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'

export const OptInRequirement = () => {
  return (
    <Fragment>
      <FormSectionHeader title={'Opt-In Requirement'} />
      <Box mb={2}>
        <Typography variant='subtitle1'>
          I confirm to be treated as an “Accredited Investor” by InvestaX
        </Typography>
      </Box>
      <DeclarationsListFields
        data={[
          {
            name: 'optInAgreements1',
            label: <SafeguardAgreements />
          },
          {
            name: 'optInAgreements2',
            label: <OptInAgreements showOptOutDialog />
          }
        ]}
      />
    </Fragment>
  )
}
