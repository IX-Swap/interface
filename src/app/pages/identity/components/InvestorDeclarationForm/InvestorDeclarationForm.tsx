import React, { useEffect } from 'react'
import { Grid, Typography } from '@mui/material'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
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

  const isCorporate = identityType === 'corporate'
  const title = `I declare that I am "${
    isCorporate ? 'Corporate' : 'Individual'
  } Accredited Investor"`

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
      <Grid data-testid='investorStatusDeclaration' container spacing={3}>
        <Grid item xs={12}>
          <Typography>{title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <InvestorAgreements type={identityType} />
        </Grid>
      </Grid>
    </>
  )
}
