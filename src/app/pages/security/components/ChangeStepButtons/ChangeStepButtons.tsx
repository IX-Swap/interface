import React from 'react'
import { Button, Grid } from '@mui/material'
import { useStyles } from 'app/pages/security/components/ChangeStepButtons/ChangeStepButtons.styles'
import { history } from 'config/history'
import { SecurityRoute } from 'app/pages/security/router/config'

export interface ChangeStepButtonsProps {
  isBackButtonVisible: boolean
  isNextButtonVisible: boolean
  isContinueButtonVisible?: boolean
  onBackButtonClick: () => void
  onNextButtonClick: () => void
}

export const ChangeStepButtons = ({
  isBackButtonVisible,
  isNextButtonVisible,
  isContinueButtonVisible = false,
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
        <Grid item className={classes.item}>
          <Button
            variant='outlined'
            color='primary'
            disableElevation
            className={classes.button}
            onClick={onBackButtonClick}
          >
            Back
          </Button>
        </Grid>
      )}

      {isNextButtonVisible && (
        <Grid item className={classes.item}>
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

      {isContinueButtonVisible && (
        <Grid item className={classes.item}>
          <Button
            color={'primary'}
            variant={'contained'}
            className={classes.button}
            onClick={() => history.push(SecurityRoute.landing)}
          >
            Continue
          </Button>
        </Grid>
      )}
    </Grid>
  )
}
