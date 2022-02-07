import React, { useEffect } from 'react'
import { Grid, Typography } from '@mui/material'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { DeclarationsListFields } from 'app/pages/identity/components/InvestorDeclarationForm/DeclarationsList/DeclartionsListFields'
import { OptInAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/OptInAgreements/OptInAgreements'
import { InvestorAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/InvestorAgreements/InvestorAgreements'
import { useFormContext } from 'react-hook-form'
import { useServices } from 'hooks/useServices'
import { IdentityType } from 'app/pages/identity/utils/shared'

export interface InvestorDeclarationFormProps {
  identityType?: IdentityType
}

export const InvestorDeclarationForm = ({
  identityType = 'individual'
}: InvestorDeclarationFormProps) => {
  const { snackbarService } = useServices()
  const { errors } = useFormContext()
  const declarationsError = errors.investorDeclarations
  const optInAgreementsError = errors.optInAgreements

  useEffect(() => {
    if (declarationsError !== undefined) {
      void snackbarService.showSnackbar(declarationsError.message, 'error')
    }
    if (optInAgreementsError !== undefined) {
      void snackbarService.showSnackbar(optInAgreementsError.message, 'error')
    }
  }, [declarationsError, optInAgreementsError]) // eslint-disable-line

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
