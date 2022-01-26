import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import { FundSourceFields } from 'app/pages/identity/components/FinancialInformationForm/FundSourceFields'
import { FundSourceHeader } from 'app/pages/identity/components/FinancialInformationForm/FundSourceHeader'
import { useFormError } from 'hooks/useFormError'
import { useServices } from 'hooks/useServices'

export const FundSource = () => {
  const { error } = useFormError('sourceOfFund')
  const noFundSourceSelected = error?.type === 'noFundSourceSelected'
  const invalidFundSourceSum = error?.type === 'incorrectSumOfFundSourcesValues'
  const { snackbarService } = useServices()

  useEffect(() => {
    if (noFundSourceSelected) {
      void snackbarService.showSnackbar(
        'Please select at least one fund source',
        'error'
      )
    }
    if (invalidFundSourceSum) {
      void snackbarService.showSnackbar(
        'Total of all investment should be 100%',
        'error'
      )
    }
  }, [noFundSourceSelected, invalidFundSourceSum]) // eslint-disable-line

  return (
    <Grid container direction='column'>
      <Grid item>
        <FundSourceHeader />
      </Grid>
      <Grid item>
        <FundSourceFields />
      </Grid>
    </Grid>
  )
}
