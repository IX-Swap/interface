import React from 'react'
import { Button, Grid } from '@mui/material'

export interface ChangeStepButtonsProps {
  isBackButtonVisible: boolean
  isNextButtonVisible: boolean
  onBackButtonClick: () => void
  onNextButtonClick: () => void
}

export const ChangeStepButtons = ({
  isBackButtonVisible,
  isNextButtonVisible,
  onBackButtonClick,
  onNextButtonClick
}: ChangeStepButtonsProps) => {
  return (
    <Grid container spacing={3} justifyContent='center' alignItems='center'>
      {isBackButtonVisible && (
        <Grid item>
          <Button
            variant='outlined'
            color='primary'
            disableElevation
            onClick={onBackButtonClick}
          >
            Back
          </Button>
        </Grid>
      )}

      {isNextButtonVisible && (
        <Grid item>
          <Button
            variant='contained'
            color='primary'
            disableElevation
            onClick={onNextButtonClick}
          >
            Next
          </Button>
        </Grid>
      )}
    </Grid>
  )
}
