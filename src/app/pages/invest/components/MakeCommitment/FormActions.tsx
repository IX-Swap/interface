import { Button, Grid } from '@mui/material'
import { InvestRoute } from 'app/pages/invest/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import {
  CommitmentFormValues,
  SubmitCommitmentFormValues
} from 'types/commitment'

export interface FormActionsProps {
  showCommit?: boolean
  onSubmit: (args: SubmitCommitmentFormValues) => Promise<void>
}
export const FormActions = ({
  showCommit = false,
  onSubmit
}: FormActionsProps) => {
  const params = useParams<{ dsoId: string; issuerId: string }>()
  const { formState, getValues } = useFormContext<CommitmentFormValues>()
  const handleSubmit = async (action: SubmitCommitmentFormValues['action']) => {
    const values = getValues()
    await onSubmit({ action, ...values })
  }
  return (
    <Grid container spacing={3} justifyContent='flex-end'>
      <Grid
        item
        xs={showCommit ? 12 : 6}
        md={2}
        order={{ xs: showCommit ? 3 : 1, md: 1 }}
      >
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
      {showCommit && (
        <Grid item xs={6} md={2} order={{ xs: 1, md: 2 }}>
          <Button
            variant='contained'
            size='large'
            fullWidth
            onClick={async () => await handleSubmit('commit')}
            disableElevation
            disabled={!formState.isValid}
          >
            Commit
          </Button>
        </Grid>
      )}
      <Grid item xs={6} md={2} order={{ xs: 2, md: 3 }}>
        <Button
          variant='contained'
          size='large'
          fullWidth
          onClick={async () => await handleSubmit('invest')}
          disableElevation
          disabled={!formState.isValid}
        >
          Invest
        </Button>
      </Grid>
    </Grid>
  )
}
