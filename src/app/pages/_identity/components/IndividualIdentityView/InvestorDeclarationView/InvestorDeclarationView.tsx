import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { DeclarationsList } from 'app/pages/_identity/components/DeclarationsList/DeclarationsList'

// TODO Remove after added new interfaces
export interface StatusDeclaration {
  accreditedInvestorDeclaration: Record<string, boolean>
  optInRequirement: Record<string, boolean>
  accreditedInvestorOptOut: Record<string, boolean>
}

export interface InvestorDeclarationViewProps {
  data: StatusDeclaration
}

export const InvestorDeclarationView: React.FC<InvestorDeclarationViewProps> = ({
  data
}) => {
  const {
    accreditedInvestorDeclaration,
    optInRequirement,
    accreditedInvestorOptOut
  } = data

  return (
    <Grid container>
      <DeclarationsList
        title='I declare that I am an individual "Accredited Investor"'
        data={accreditedInvestorDeclaration}
      />
      <Grid item xs={12}>
        <Box marginTop={8}>
          <FormSectionHeader title='Opt-In Requirement' variant='h5' />
        </Box>
      </Grid>
      <DeclarationsList
        title='I confirm to be treated as an “Accredited Investor” by InvestaX'
        data={optInRequirement}
      />
      <Grid item xs={12}>
        <Box marginTop={8}>
          <FormSectionHeader
            title='Accredited Investor Opt-Out Form'
            variant='h5'
          />
        </Box>
      </Grid>
      <DeclarationsList
        title='My/Our withdrawal of consent to be treated as an Accredited Investor by InvestaX is in respect of the following services.'
        data={accreditedInvestorOptOut}
      />
    </Grid>
  )
}
