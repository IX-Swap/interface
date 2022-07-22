import { Button, Grid } from '@mui/material'
import { InvestRoute } from 'app/pages/invest/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { DigitalSecurityOffering } from 'types/dso'

export interface FormActionsProps {
  dso: DigitalSecurityOffering
}

export const FormActions = ({ dso }: FormActionsProps) => {
  const params = useParams<{ dsoId: string; issuerId: string }>()
  const { formState } = useFormContext()

  return (
    <Grid container spacing={3} justifyContent='flex-end'>
      <Grid item xs={6} md={2}>
        <Button
          variant='outlined'
          fullWidth
          color='primary'
          disableElevation
          component={AppRouterLinkComponent}
          to={InvestRoute.view}
          params={params}
          replace
          size='large'
        >
          Cancel
        </Button>
      </Grid>

      <Grid item xs={6} md={2}>
        <Button
          variant='contained'
          type='submit'
          size='large'
          fullWidth
          disableElevation
          disabled={!formState.isValid}
        >
          Invest
        </Button>
      </Grid>
    </Grid>
  )
}
