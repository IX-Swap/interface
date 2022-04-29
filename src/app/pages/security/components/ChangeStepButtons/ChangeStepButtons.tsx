import React from 'react'
import { Button, Grid } from '@mui/material'
import { useStyles } from 'app/pages/security/components/ChangeStepButtons/ChangeStepButtons.styles'
import classnames from 'classnames'

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
  const classes = useStyles()

  return (
    <Grid
      container
      justifyContent='flex-end'
      alignItems='center'
      className={classes.container}
    >
      {isBackButtonVisible && (
        <Grid item>
          <Button
            variant='outlined'
            color='primary'
            disableElevation
            className={classnames(classes.button, classes.firstButton)}
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
            className={classes.button}
            onClick={onNextButtonClick}
          >
            Next
          </Button>
        </Grid>
      )}
    </Grid>
  )
}
